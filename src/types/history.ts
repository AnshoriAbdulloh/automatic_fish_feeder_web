export type StatusMakan = "BERHASIL" | "GAGAL";

export interface History {
    id: string;
    waktu: string;
    status: "BERHASIL" | "GAGAL";
    }
