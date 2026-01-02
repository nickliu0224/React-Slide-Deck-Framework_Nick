import { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { collection, doc, onSnapshot, setDoc, writeBatch } from 'firebase/firestore';
import { defaultSlides } from '../data/slides';
import { Slide } from '../types';

export const useContent = (isAdmin: boolean) => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Determine collection path. In a real app, this might be dynamic.
    const collectionRef = collection(db, 'content');

    // Subscribe to Firestore updates
    const unsubscribe = onSnapshot(collectionRef, async (snapshot) => {
      try {
        if (snapshot.empty) {
            // AUTO-REPAIR: If DB is empty, seed with default data
            console.warn("Database empty. Auto-repairing with default slides...");
            const batch = writeBatch(db);
            defaultSlides.forEach((slide) => {
              const docRef = doc(collectionRef, slide.id);
              batch.set(docRef, slide);
            });
            await batch.commit();
            // Snapshot will fire again after write, so no need to setSlides here manually
        } else {
          const loadedSlides: Slide[] = snapshot.docs.map(doc => doc.data() as Slide);
          // Sort by slide ID or add a 'order' field. 
          // For simplicity, we assume ID order or insert order matches for now.
          // A robust system would have an 'order' field.
          loadedSlides.sort((a, b) => a.id.localeCompare(b.id)); 
          setSlides(loadedSlides);
        }
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching slides:", err);
        // Fallback to local data if Firebase fails (e.g., missing permissions or offline)
        setSlides(defaultSlides);
        setError("Failed to sync with cloud. Using local backup.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateSlide = async (slide: Slide) => {
    if (!isAdmin) return;
    try {
      await setDoc(doc(db, 'content', slide.id), slide);
    } catch (err) {
      console.error("Error updating slide:", err);
      alert("Failed to save changes. Check console.");
    }
  };

  const resetContent = async () => {
     if (!isAdmin) return;
     if(!confirm("Are you sure you want to reset all slides to default? This cannot be undone.")) return;

     const batch = writeBatch(db);
     defaultSlides.forEach((slide) => {
        const docRef = doc(db, 'content', slide.id);
        batch.set(docRef, slide);
     });
     await batch.commit();
  };

  return { slides, loading, error, updateSlide, resetContent };
};