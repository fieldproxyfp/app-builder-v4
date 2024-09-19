import { nanoid } from 'nanoid';
import { create } from 'zustand';

export type Notification = {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message?: string;
  autoDismiss?: boolean;
};

type NotificationsStore = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  dismissNotification: (id: string) => void;
  dismissNotificationAfterDelay: (id: string, delay: number) => void;
};

export const useNotifications = create<NotificationsStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => {
      const newNotification = { id: nanoid(), ...notification };
      if (notification.autoDismiss) {
        setTimeout(() => {
          set((state) => ({
            notifications: state.notifications.filter(
              (n) => n.id !== newNotification.id
            ),
          }));
        }, 1600);
      }
      return {
        notifications: [...state.notifications, newNotification],
      };
    }),
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id,
      ),
    })),
  dismissNotificationAfterDelay: (id, delay) =>
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter(
          (notification) => notification.id !== id,
        ),
      }));
    }, delay),
}));
