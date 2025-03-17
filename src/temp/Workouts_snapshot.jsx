import React, { useEffect } from 'react';
import { readData } from '../appwrite/crud';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from "../appwrite/configAppwrite";

const collectionMap = {
    workouts: import.meta.env.VITE_COLLECTION_ID_WORKOUTS,
    trainers: import.meta.env.VITE_COLLECTION_ID_TRAINERS,
    members: import.meta.env.VITE_COLLECTION_ID_MEMBERS,
    classes: import.meta.env.VITE_COLLECTION_ID_CLASSES,
    reservations: import.meta.env.VITE_COLLECTION_ID_RESERVATIONS
};

export const Workouts_snapshot = () => {
    const queryClient = useQueryClient();

    // 🔹 Alapadatok lekérése React Query-vel
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['workouts'],
        queryFn: () => readData("workouts"),
        staleTime: 1000 * 60 * 5, // Cache idő: 5 perc
    });

    // 🔹 Snapshot figyelése (real-time updates)
    useEffect(() => {
        const collectionId = collectionMap["workouts"];

        const unsubscribe = client.subscribe(
            `databases.${import.meta.env.VITE_DATABASE_ID}.collections.${collectionId}.documents`,
            (response) => {
                console.log("Snapshot update:", response);

                if (response.events[0].includes("delete") || 
                    response.events[0].includes("create") || 
                    response.events[0].includes("update")) {
                    
                    queryClient.invalidateQueries(["workouts"]); // Adatok frissítése
                }
            }
        );

        return () => unsubscribe(); // Leiratkozás unmount-nál
    }, [queryClient]);

    // 🔹 UI kezelés
    if (isLoading) return <p>Betöltés...</p>;
    if (isError) return <p>Hiba: {error.message}</p>;

    return (
        <div>
            <h2>Workouts</h2>
            <ul>
                {data?.map((workout) => (
                    <li key={workout.$id}>{workout.name}</li>
                ))}
            </ul>
        </div>
    );
};
