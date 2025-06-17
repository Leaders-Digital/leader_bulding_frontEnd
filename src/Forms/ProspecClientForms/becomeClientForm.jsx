import {Select, Input, Button, Spin} from "antd";
import { useState, useEffect } from "react";
import useProspects from "../../Hooks/ProspectClientHooks/useProspects.js";
import useBecomeClient from "../../Hooks/ClientsHooks/useBecomeClient.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const BecomeClientForm = ({ handleAdd }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [filter] = useState({ status: "", search: "" });
    const [pagination] = useState({ current: 1, pageSize: 100 });
    const { prospects = [] } = useProspects(filter, pagination);
    const{resposne,becomeClient,error,isMutating}=useBecomeClient()
const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cin: "",
        name: "",
        lastName: "",
        email: "",
        telephone: "",
        adresse: "",
    });

    useEffect(() => {
        if (selectedId) {
            const prospect = prospects.find((p) => p._id === selectedId);
            if (prospect) {
                setFormData({
                    cin: prospect.CIN || "",
                    name: prospect.name || "",
                    lastName: prospect.lastName || "",
                    email: prospect.email || "",
                    telephone: prospect.telephone?.[0] || "",
                    adresse: prospect.adresse || "",

                });
            }
        }
    }, [selectedId, prospects]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value) => {
        setSelectedId(value);
    };

    const handleSubmit =async () => {
        try {
            setIsLoading(true);
            const data={...formData,clientId:selectedId,role:'client'}
            await becomeClient(data)
            navigate('/gestionClient/client')

            setIsLoading(false);
            toast.success('client created');
        }catch (error) {
            setIsLoading(false);
            toast.error(error.message);
            console.log(error);
        }

    };

    const labelClass = "block text-gray-900 font-semibold mb-2 text-sm";

    return (
        <div className={"px-6 py-4"}>
            <label className="block text-gray-900 font-semibold mb-3 text-lg">
                Choisir un Prospect
            </label>
            <Select
                showSearch
                placeholder="Sélectionner un prospect"
                className="w-full mb-6"
                optionFilterProp="children"
                value={selectedId}
                onChange={handleSelectChange}
                loading={prospects.length === 0}
                size="large"
                bordered={false}
                style={{ borderBottom: "2px solid #f7d47a" }}
                dropdownStyle={{ borderRadius: 8 }}
            >
                {prospects.map((p) => (
                    <Select.Option key={p._id} value={p._id}>
                        {p.name} {p.lastName}
                    </Select.Option>
                ))}
            </Select>

            <div className={"grid grid-cols-2 gap-8"}>
                <div>
                    <label htmlFor="cin" className={labelClass}>
                        CIN
                    </label>
                    <Input
                        id="cin"
                        name="cin"
                        placeholder="CIN"
                        value={formData.cin}
                        onChange={handleChange}
                        className="mb-5 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        size="large"
                        bordered={false}
                    />
                </div>
                <div>
                    <label htmlFor="email" className={labelClass}>
                        Email
                    </label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mb-5 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        size="large"
                        bordered={false}
                    />
                </div>

                <div>
                    <label htmlFor="name" className={labelClass}>
                        Name
                    </label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mb-5 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        size="large"
                        bordered={false}
                    />
                </div>

                <div>
                    <label htmlFor="lastName" className={labelClass}>
                        Last Name
                    </label>
                    <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mb-5 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        size="large"
                        bordered={false}
                    />
                </div>



                <div>
                    <label htmlFor="telephone" className={labelClass}>
                        Telephone
                    </label>
                    <Input
                        id="telephone"
                        name="telephone"
                        placeholder="Telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className="mb-5 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        size="large"
                        bordered={false}
                    />
                </div>

                <div>
                    <label htmlFor="adresse" className={labelClass}>
                        Adresse
                    </label>
                    <Input
                        id="adresse"
                        name="adresse"
                        placeholder="Adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                        className="mb-5 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        size="large"
                        bordered={false}
                    />
                </div>


            </div>

            <div className={"flex justify-center mt-8"}>
                <Button
                    type="primary"
                    size="large"
                    block
                    style={{ backgroundColor: "#F7D47A", borderColor: "#F7D47A", width: "20%" }}
                    onClick={handleSubmit}
                    className={"text-black font-semibold"}
                    disabled={isLoading || !selectedId}
                >
                    {isLoading?<Spin/>:'Ajouter Client'}
                </Button>
            </div>
        </div>
    );
};

export default BecomeClientForm;
