import { showNotification } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons';


export const showLoadingSuccesNotification = (title: string, message: string) => {
  showNotification({
    title,
    message,
    autoClose: 3000,
    loading: true,
    styles: (theme) => ({
      root: { backgroundColor: theme.colors.green[5], borderColor: theme.colors.green[5] },
      title: { color: theme.white },
      description: { color: theme.white },
    }),
  })
}

export const showSuccesNotification = (title: string, message: string) => {
  showNotification({
    title,
    message,
    color: "green",
      autoClose: 5000,
      icon: <IconCheck />,
      styles: (theme) => ({
        root: { backgroundColor: theme.colors.green[5], borderColor: theme.colors.green[5] },
        title: { color: theme.white },
        description: { color: theme.white },
      }),
  })
}

export const showErrorNotification = (title: string, message: string) => {
  showNotification({
    title,
    message,
    autoClose: 5000,
    color: "red",
    icon: <IconX />,
    styles: (theme) => ({
      root: { backgroundColor: theme.colors.red[5], borderColor: theme.colors.red[5] },
      title: { color: theme.white },
      description: { color: theme.white },
    }),
  });

}

