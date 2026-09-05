import { Menu, Button, Text, Avatar } from '@mantine/core';
import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
} from '@tabler/icons-react';
import { useSelector } from 'react-redux';

const ProfileMenu = () => {
    const user = useSelector((state: any) => state.user);
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
               <div className='flex items-center gap-3 cursor-pointer'>
                <span className='font-medium text-lg text-neutral-900'>{user?.name|| "Guest"}</span>
                 <Avatar variant='filled' src="/avatar.png" size={45} alt="it's me" />
               </div>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                {/* Fixed: Changed GearSixIcon to IconSettings */}
                <Menu.Item leftSection={<IconSettings size={14} />}>
                    Settings
                </Menu.Item>
                {/* Fixed: Changed ChatCircleIcon to IconMessageCircle */}
                <Menu.Item leftSection={<IconMessageCircle size={14} />}>
                    Messages
                </Menu.Item>
                {/* Fixed: Changed ImageIcon to IconPhoto */}
                <Menu.Item leftSection={<IconPhoto size={14} />}>
                    Gallery
                </Menu.Item>
                {/* Fixed: Changed MagnifyingGlassIcon to IconSearch */}
                <Menu.Item
                    leftSection={<IconSearch size={14} />}
                    rightSection={
                        <Text size="xs" c="dimmed">
                            ⌘K
                        </Text>
                    }
                >
                    Search
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                    leftSection={<IconArrowsLeftRight size={14} />}
                >
                    Transfer my data
                </Menu.Item>
                {/* Fixed: Changed TrashIcon to IconTrash */}
                <Menu.Item
                    color="red"
                    leftSection={<IconTrash size={14} />}
                >
                    Delete my account
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default ProfileMenu;