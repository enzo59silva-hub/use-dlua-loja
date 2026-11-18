import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { COLLECTIONS, getDb } from "./firebase";

export type Review = {
  /** ID do documento = ID da conta de quem avaliou (garante 1 avaliação por pessoa). */
  id: string;
  userId: string;
  name: string;
  rating: number;
  text: string;
  /** ISO date */
  createdAt: string;
};

export async function fetchReviews(): Promise<Review[]> {
  const db = getDb();
  if (!db) return [];
  const snap = await getDocs(
    query(collection(db, COLLECTIONS.reviews), orderBy("createdAt", "desc")),
  );
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Review, "id">) }));
}

export async function submitReview(data: Omit<Review, "id" | "createdAt">) {
  const db = getDb();
  if (!db) throw new Error("Firebase ainda não configurado.");
  await setDoc(doc(db, COLLECTIONS.reviews, data.userId), {
    ...data,
    createdAt: new Date().toISOString(),
  });
}
