import { Tag } from "antd";
import projectStatus from "./ProspectManagementColumns/projectStatus";
import { Icon } from "@iconify/react/dist/iconify.js";

const projectColumns=({onActionClick,onClickDetails})=>{

    return [
        {
          title: "Nom",
          dataIndex: "name",
          sorter: true,
          render: (name, record) => `${record.name} `,
          width: "20%",
        },
        {
          title: "Type de projet",
          dataIndex: "projectType",
        },
        {
          title: "location",
          dataIndex: "location",
          className: "text-center",
        },
        {
          title: "Status",
          dataIndex: "status",
          render:(_,record)=>( <Tag bordered={false} color={projectStatus[record.status]}> {record.status} </Tag> )
        },
      
        {
          title: "budget",
          dataIndex: "budget",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => ( <div className="w-full h-full flex flex-row gap-4 justify-center">  <button onClick={()=>onClickDetails(record._id)}><Icon icon="hugeicons:eye" width="24" height="24"  /></button> <button onClick={()=>onActionClick("edit",record)}><Icon icon="hugeicons:pencil-edit-02" className="h-6 w-6" /></button> <button onClick={()=>onActionClick('delete',record)}><Icon icon="hugeicons:delete-01" width="24" height="24"  style={{color:"#ec1919"}} /></button> </div>),
          },
        
      ];
}
export default projectColumns