import { notifications } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons-react"

const successNotification = (message: string) => {
    notifications.show({
        title: "Success",
        message: message,
        color: 'teal',
        icon: <IconCheck />,
        withCloseButton: true,
        withBorder: true,
        className: "!border-green-500 !bg-green-200"
        // target the inner notification root style directly
        // styles: {
        //     root: { backgroundColor: 'var(--mantine-color-green-light)' },
        // }
    })
}

const errorNotification = (message: string) => {
    notifications.show({
        title: "Error",
        message: message,
        color: 'red',
        icon: <IconX />,
        withCloseButton: true,
        withBorder: true,
        className: "!border-red-500 !bg-red-200"
        // target the inner notification root style directly
        // styles: {
        //     root: { backgroundColor: 'var(--mantine-color-red-light)' },
        // }
    })
}


export { successNotification, errorNotification };