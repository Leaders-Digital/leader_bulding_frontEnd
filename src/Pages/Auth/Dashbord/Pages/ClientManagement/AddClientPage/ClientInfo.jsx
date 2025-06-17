import { Descriptions, Avatar } from 'antd';

const ClientInfo = ({ data }) => {
    return (
        <Descriptions
            title="Informations du client"
            bordered
            column={1}
            size="middle"
        >
            <Descriptions.Item label="Nom">
                {data.name} {data.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
            <Descriptions.Item label="Téléphone">{data.telephone}</Descriptions.Item>
            <Descriptions.Item label="Adresse">{data.adresse}</Descriptions.Item>
            <Descriptions.Item label="Date de naissance">
                {data.dateDeNaissance?.slice(0, 10)}
            </Descriptions.Item>
            <Descriptions.Item label="Rôle">{data.role}</Descriptions.Item>
            <Descriptions.Item label="Client ID">{data.clientId}</Descriptions.Item>
            <Descriptions.Item label="Profile">
                <Avatar src={data.profilePic} size={64} />
            </Descriptions.Item>
        </Descriptions>
    );
};

export default ClientInfo;
