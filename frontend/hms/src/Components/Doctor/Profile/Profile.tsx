import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates';
import { IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { bloodGroups, doctorDepartments, doctorSpecialization } from '../../../Data/DropdownData';
import { useDisclosure } from '@mantine/hooks';
import { getDecorators } from 'typescript';
import { getDoctor, updateDoctor } from '../../../Service/DoctorProfileService';
import { arrayToCSV } from '../../../Utility/OtherUtility';
import { useForm } from '@mantine/form';
import { formatDate } from '../../../Utility/DateUtility';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';

const doctor: any = {
    name: "John Doe",
    email: "john.doe@example.com",
    dob: "1990-05-15",
    phone: "+91 9876543210",
    address: "123, Main Street, Mumbai, India",
    licenceNo: "MH-123456789",
    specialization: "Cardiologist",
    department: "Cardiology",
    totalExp: 10,
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg"
};
const Profile = () => {

    const user = useSelector((state: any) => state.user)
    const [editMode, setEdit] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [profile, setProfile] = useState<any>({});
  useEffect(() => {
        console.log(user);
        getDoctor(user.profileId).then((data) => {
            setProfile({ ...data});
        }).catch((error) => {
            console.log(error);
        })
    }, [])


    const form = useForm({

        initialValues: {
            dob: '',
            phone: '',
            address: '',
            licenceNo: '',
            specialization: '',
            department : '' ,
            totalExp:'',

        },

        validate: {
            dob: (value) => !value ? 'Date of birth is required' : undefined,
            phone: (value) => !value ? 'Phone number is required' : undefined,
            address: (value) => !value ? 'address is required' : undefined,
            licenceNo: (value) => !value ? 'licenceNo no is required' : undefined,
        },
    });

    const handleEdit = () => {
        form.setValues({ ...profile ,dob: profile.dob ? new Date(profile.dob) : undefined});
        setEdit(true);
    }

    const handleSubmit = (e?: any) => {
        let values = form.getValues();
        form.validate();
        if (!form.isValid()) return;
        console.log(values);
        updateDoctor({ ...profile, ...values }).then((_data) => {
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
                            <Table.Td className="font-semibold text-xl">Licence No</Table.Td>
                            {editMode ?
                                <Table.Td className='text-xl'><TextInput {...form.getInputProps("licenceNo")} maxLength={12}
                                    
                                    placeholder='licence No'
                                /></Table.Td> :
                                <Table.Td className='text-xl'>{profile.licenceNo || '-'}</Table.Td>}
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Doctor Specialization</Table.Td>
                            {editMode ?
                                <Table.Td className='text-xl'><Select {...form.getInputProps("specialization")} data={doctorSpecialization} placeholder='Doctor Specialization' /></Table.Td> :
                                <Table.Td className='text-xl'>{profile.specialization||'-'}</Table.Td>}
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Doctor Department</Table.Td>
                            {editMode ?
                                <Table.Td className='text-xl'>
                                    <Select {...form.getInputProps("depa rtment")} data={doctorDepartments} placeholder="Doctor Department" />
                                </Table.Td> :
                                <Table.Td className='text-xl'>{profile.department || "-"}</Table.Td>}
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Td className="font-semibold text-xl">Total Experiance</Table.Td>
                            {editMode ?
                                <Table.Td className='text-xl'>
                                    <NumberInput {...form.getInputProps("totalExp")} placeholder="Total Experiance" maxLength={2} max={50} />
                                </Table.Td> :
                                <Table.Td className='text-xl'>{profile.totalExp || "-"} {profile.totalExp?'Years': ''}</Table.Td>}
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