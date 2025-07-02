import React, {useEffect, useState} from 'react';
import {Avatar, Button, Modal, Select} from 'antd';
import {CloseOutlined, PlusOutlined, UserOutlined} from '@ant-design/icons';
import {toast} from 'react-toastify';
import useUsers from '../../../../../../../Hooks/useUsers';
import useModifyProject from '../../../../../../../Hooks/ProjectHooks/useModifyProject';

const ProjectMembers = ({project, onProjectUpdate}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [currentMembers, setCurrentMembers] = useState([]);
    const [filter, setFilter] = useState({search: "", status: ""});
    const [pagination, setPagination] = useState({current: 1, pageSize: 1000});
    const [deletingMemberId, setDeletingMemberId] = useState(null);

    const {users, isLoading, error, totalPages, totalItems, usersMutation} = useUsers(filter, pagination);
    const {modifyProject, isMutating} = useModifyProject();

    useEffect(() => {
        const projectMembers = Array.isArray(project?.data?.members)
            ? project.data.members
            : Array.isArray(project?.members)
                ? project.members
                : [];

        if (users && users.length > 0) {
            if (projectMembers.length > 0) {
                const memberIds = projectMembers.map(member => {
                    if (typeof member === 'string') {
                        return member;
                    } else if (member && typeof member === 'object' && member._id) {
                        return member._id;
                    } else if (member && typeof member === 'object' && member.id) {
                        return member.id;
                    }
                    return member;
                });

                const membersDetails = users.filter(user => {
                    const isMember = memberIds.includes(user._id);
                    return isMember;
                });
                setCurrentMembers(membersDetails);

                const available = users.filter(user =>
                    !memberIds.includes(user._id)
                );
                setAvailableUsers(available);
            } else {
                setCurrentMembers([]);
                setAvailableUsers(users);
            }
        } else if (users) {
            setCurrentMembers([]);
            setAvailableUsers(users);
        }
    }, [users, project?.data?.members, project?.members]);

    // Cleanup effect to reset deleting state when component unmounts
    useEffect(() => {
        return () => {
            setDeletingMemberId(null);
        };
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedUsers([]);
    };

    const handleAddMembers = async () => {
        if (selectedUsers.length === 0) {
            toast.warning("Veuillez sélectionner au moins un membre");
            return;
        }

        try {
            const loadingToast = toast.loading("Ajout des membres en cours...");

            const currentMembers = Array.isArray(project?.data?.members)
                ? project.data.members
                : Array.isArray(project?.members)
                    ? project.members
                    : [];

            const updatedMembers = [...currentMembers, ...selectedUsers];

            await modifyProject({
                id: project.data._id,
                data: {
                    members: updatedMembers
                }
            });

            toast.dismiss(loadingToast);
            toast.success("Membres ajoutés avec succès!");

            if (onProjectUpdate) {
                await onProjectUpdate();
            }

            setIsModalVisible(false);
            setSelectedUsers([]);
        } catch (error) {
            console.error('Error adding members:', error);
            toast.error("Erreur lors de l'ajout des membres");
        }
    };

    const handleRemoveMember = async (userId) => {
        try {
            setDeletingMemberId(userId);
            const loadingToast = toast.loading("Suppression du membre en cours...");

            const currentMembers = Array.isArray(project?.data?.members)
                ? project.data.members
                : Array.isArray(project?.members)
                    ? project.members
                    : [];

            const memberIds = currentMembers.map(member => {
                if (typeof member === 'string') {
                    return member;
                } else if (member && typeof member === 'object' && member._id) {
                    return member._id;
                } else if (member && typeof member === 'object' && member.id) {
                    return member.id;
                }
                return member;
            });

            const updatedMembers = currentMembers.filter((member, index) => {
                const memberId = memberIds[index];
                return memberId !== userId;
            });

            await modifyProject({
                id: project.data._id,
                data: {
                    members: updatedMembers
                }
            });

            toast.dismiss(loadingToast);
            toast.success("Membre supprimé avec succès!");

            if (onProjectUpdate) {
                await onProjectUpdate();
            }
        } catch (error) {
            console.error('Error removing member:', error);
            toast.error("Erreur lors de la suppression du membre");
        } finally {
            setDeletingMemberId(null);
        }
    };

    const getUserInitials = (name, lastName) => {
        if (!name && !lastName) return 'U';
        const firstName = name || '';
        const lastNameStr = lastName || '';
        return (firstName + ' ' + lastNameStr).split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="col-span-3 mt-4">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-xl text-gray-700">Membres du projet :</span>
                    <Button
                        type="primary"
                        icon={<PlusOutlined/>}
                        onClick={showModal}
                        className="!bg-Golden !border-Golden !text-[#3A3541] font-jakarta font-bold px-4 py-2 rounded-lg hover:!bg-[#ddb84e] hover:!border-[#ddb84e]"
                        loading={isMutating}
                    >
                        Ajouter des membres
                    </Button>
                </div>

                {currentMembers.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                        {currentMembers.map((member) => (
                            <div
                                key={member._id}
                                className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 border hover:bg-gray-200 transition-colors group relative"
                            >
                                <Avatar
                                    size="small"
                                    icon={<UserOutlined/>}
                                    className="bg-Golden text-[#3A3541]"
                                >
                                    {getUserInitials(member.name, member.lastName)}
                                </Avatar>
                                <span className="font-medium text-sm text-gray-700">
                                    {member.name} {member.lastName}
                                </span>
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<CloseOutlined/>}
                                    onClick={() => handleRemoveMember(member._id)}
                                    className="!text-red-500 hover:!text-red-700 hover:!bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full w-6 h-6 flex items-center justify-center"
                                    loading={deletingMemberId === member._id}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
                        Aucun membre assigné à ce projet
                    </div>
                )}
            </div>

            {/* Add Members Modal */}
            <Modal
                title="Ajouter des membres au projet"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Annuler
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleAddMembers}
                        loading={isMutating}
                        className="!bg-Golden !border-Golden !text-[#3A3541] hover:!bg-[#ddb84e] hover:!border-[#ddb84e]"
                    >
                        Ajouter
                    </Button>
                ]}
                width={500}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sélectionner les membres à ajouter :
                        </label>
                        <Select
                            mode="multiple"
                            placeholder="Choisir des utilisateurs..."
                            value={selectedUsers}
                            onChange={setSelectedUsers}
                            loading={isLoading}
                            className="w-full"
                            optionFilterProp="label"
                            showSearch
                        >
                            {availableUsers.map((user) => (
                                <Select.Option
                                    key={user._id}
                                    value={user._id}
                                    label={`${user.name} ${user.lastName}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Avatar
                                            size="small"
                                            icon={<UserOutlined/>}
                                            className="bg-Golden text-[#3A3541]"
                                        >
                                            {getUserInitials(user.name, user.lastName)}
                                        </Avatar>
                                        <span>{user.name} {user.lastName}</span>
                                    </div>
                                </Select.Option>
                            ))}
                        </Select>
                    </div>

                    {selectedUsers.length > 0 && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-700">
                                {selectedUsers.length} membre(s) sélectionné(s)
                            </p>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default ProjectMembers;