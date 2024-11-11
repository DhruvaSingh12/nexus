import { create } from 'zustand'; 

interface ClubModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useClubModal = create<ClubModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useClubModal;
