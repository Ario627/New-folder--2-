export interface ErineProfie {
    id: string;
    name: string;
    stageName: string;
    bio: string;
    generation: string;
    position : string;
    birthday: string;
    imageCover: string;
    imageProfile: string;
}

export interface GalleryImage {
    id: string;
    title: string;
    imageUrl: string;
    category: "photo" | "video";
    date: string;
    description?: string;
}

export interface  Schedule {
    id: string;
    name: string;
    title: string;
    type: "performance" | "event" | "meeting";
    startTime: string;
    endTime: string;
    location: string;
    details?: string;
    imageUrl?: string;
}