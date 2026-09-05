
import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates';
import { IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { bloodGroup, bloodGroups } from '../../../Data/DropdownData';
import { useDisclosure } from '@mantine/hooks';
import { getPatient, updatePatient } from '../../../Service/PatientProfileService';
import { formatDate } from '../../../Utility/DateUtility';
import { useForm } from '@mantine/form';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { arrayToCSV } from '../../../Utility/OtherUtility';

const patient: any = {
    name: "John Doe",
    email: "john.doe@example.com",
    dob: "1990-05-15",
    phone: "+91 9876543210",
    address: "123, Main STreet, Mumbai, India",
    aadharNo: "1234-5678-9012",
    bloodGroup: "O+",
    allergies: "Peanuts",
    chronicDisease: "Diabetes",
    profilePicture: "https://randomuser.me/api/porTraits/men/75.jpg"
};

const Profile = () => {

    const user = useSelector((state: any) => state.user)
    const [editMode, setEdit] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [profile, setProfile] = useState<any>({});
    useEffect(() => {
        console.log(user);
        getPatient(user.profileId).then((data) => {
            setProfile({ ...data, allergies: data.allergies ? (JSON.parse(data.allergies)) : null, chronicDisease: data.chronicDisease ? (JSON.parse(data.chronicDisease)) : null });
        }).catch((error) => {
            console.log(error);
        })
    }, [])


    const form = useForm({

        initialValues: {
            dob: profile.dob,
            phone: profile.phone,
            address: profile.address,
            aadharNo: profile.aadharNo,
            bloodGroup: profile.bloodGroup,
            allergies: [],
            chronicDisease: [],

        },

        validate: {
            dob: (value) => !value ? 'Date of birth is required' : undefined,
            phone: (value) => !value ? 'Phone number is required' : undefined,
            address: (value) => !value ? 'address is required' : undefined,
            aadharNo: (value) => !value ? 'aadhar no is required' : undefined,
        },
    });

    const handleEdit = () => {
        form.setValues({ ...profile, dob: profile.dob ? new Date(profile.dob) : undefined, chronicDisease: profile.chronicDisease ?? [], allergies: profile.allergies ?? [] });
        setEdit(true);
    }

    const handleSubmit = (e?: any) => {
        let values = form.getValues();
        form.validate();
        if (!form.isValid()) return;
        console.log(values);
        updatePatient({ ...profile, ...values, allergies: values.allergies ? JSON.stringify(values.allergies) : null, chronicDisease: values.chronicDisease ? JSON.stringify(values.chronicDisease) : null }).then((data) => {
            successNotification("Profile Updated Successfully!!!");
            setProfile({...profile,...values});
            setEdit(false);
        }).catch((error) => {
            console.log(error);
            errorNotification(error.response.data.errorMessage);
        })
    }

    return (
        <div className='p-10'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-5 items-center'>
                    <div className='flex flex-col items-center gap-3'>
                        <Avatar variant='filled' src="/avatar.png" size={150} alt="it's me" />
                        {editMode && <Button size='sm' onClick={open} variant='filled' >Upload</Button>}
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='text-3xl font-medium text-neuTral-900'>{user?.name || "User Name Not Found"}</div>
                        <div className='text-xl text-neuTral-700'>{user?.email || "User Email Not found"}</div>
                    </div>
                </div>

                {!editMode ? <Button type='button' size='lg' onClick={handleEdit} variant='filled' leftSection={<IconEdit />}>Edit</Button> :
                    <Button onClick={handleSubmit} size='lg' type='submit' variant='filled' >submit</Button>
                }

            </div>
            <Divider my="xl" />
            <div>

                <div className="text-2xl font-medium text-neuTral-900 mb-5 ">Personal Information</div>

                <Table striped stripedColor='primary.1' verticalSpacing="md" withRowBorders={false}>
                    <Table.Tbody className="[&>tr]:!mb-3 [&_td]:!w-1/2">
                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl" >Date of Birth</Table.Td>
                            {editMode ?
                                <DateInput {...form.getInputProps("dob")}
                                    placeholder="Date of Birth"
                                /> : <Table.Td className='text-xl'>{formatDate(profile.dob) || '-'}</Table.Td>}
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Phone</Table.Td>
                            {editMode ?
                                <Table.Td className='text-xl'><NumberInput {...form.getInputProps("phone")} hideControls maxLength={10} clampBehavior='strict'
                                    placeholder='Phone'
                                /></Table.Td> :
                                <Table.Td className='text-xl'>{profile.phone || '-'}</Table.Td>}
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Address</Table.Td>
                            {editMode ?
                                <Table.Td className='text-xl'><TextInput {...form.getInputProps("address")}
                                    placeholder='Address'
                                /></Table.Td> :
                                <Table.Td className='text-xl'>{profile.address || '-'}</Table.Td>}
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Aadhar No</Table.Td>
                            {editMode ?
                                <Table.Td className='text-xl'><NumberInput {...form.getInputProps("aadharNo")} hideControls maxLength={12}
                                    clampBehavior='strict'
                                    placeholder='Adhar No'
                                /></Table.Td> :
                                <Table.Td className='text-xl'>{profile.aadharNo || '-'}</Table.Td>}
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Blood Group</Table.Td>
                            {editMode ?
                                <Table.Td className='text-xl'><Select {...form.getInputProps("bloodGroup")} data={bloodGroups} placeholder='Blood Group' /></Table.Td> :
                                <Table.Td className='text-xl'>{bloodGroup[profile.bloodGroup] || '-'}</Table.Td>}
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Allergies</Table.Td>
                            {editMode ?
                                <Table.Td className='text-xl'>
                                    <TagsInput {...form.getInputProps("allergies")} placeholder="allergies" />
                                </Table.Td> :
                                <Table.Td className='text-xl'>{arrayToCSV(profile.allergies) || "-"}</Table.Td>}
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Chronic Disease</Table.Td>
                            {editMode ?
                                <Table.Td className='text-xl'>
                                    <TagsInput {...form.getInputProps("chronicDisease")} placeholder="chronicDisease" />
                                </Table.Td> :
                                <Table.Td className='text-xl'>{arrayToCSV(profile.chronicDisease) || "-"}</Table.Td>}
                        </Table.Tr>
                    </Table.Tbody>
                </Table>


            </div>
            <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload profile Picture</span>}>
                {/* Modal content */}
            </Modal>
        </div>



    )
}

export default Profile