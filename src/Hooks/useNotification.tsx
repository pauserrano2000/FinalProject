import { useCallback } from 'react';
import { showNotification } from '@mantine/notifications';
import { IconX, IconCheck } from "../Components/Icons/Icons";

type NotificationParams = {
  title: string;
  message: string;
  loading?: boolean;
}
export const useNotification = () => {
  const showSuccesNotification = useCallback(({ title, message, loading = false }: NotificationParams) => {
    showNotification({
      title,
      message,
      loading,
      color: (loading ? undefined : "green"),
      autoClose: (loading ? 3000 : 5000),
      icon: (loading ? null : <IconCheck />), //none
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.green[5],
          borderColor: theme.colors.green[5],
        },
        title: { color: theme.white, fontSize: "1.2rem" },
        description: { color: theme.white, fontSize: "1rem" },
      }),
    });
  }, []);

  const showErrorNotification = useCallback(({ title, message }: NotificationParams) => {
    showNotification({
      title,
      message,
      autoClose: 5000,
      color: "red",
      icon: <IconX />,
      styles: (theme) => ({
        root: {
          fontSize: "2rem",
          backgroundColor: theme.colors.red[5],
          borderColor: theme.colors.red[5],
        },
        title: { color: theme.white, fontSize: "1.1rem" },
        description: { color: theme.white, fontSize: "1rem" },
      }),
    });
  }, []);

  return {
    showSuccesNotification,
    showErrorNotification
  };
};

