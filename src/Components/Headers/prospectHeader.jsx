
import { UserOutlined } from '@ant-design/icons'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Avatar, Dropdown, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

const ProspectHeader = () => {
    const navigate=useNavigate()

const profileUser=()=>{
    navigate('profil')
}
const items=[{key:"1",label:"Profil",icon:<Icon icon="hugeicons:user-circle" width="24" height="24"  style={{color:" #0d0a01"}} /> ,onClick:profileUser}]


  return (
    <div className='w-[94rem] h-16 bg-white rounded-2xl mr-3 justify-between flex flex-row'>
        <div className='flex flex-row h-full justify-center items-center ml-3 gap-3'>
            <button>
                <div className='flex flex-row gap-1 '>
                <Icon icon="hugeicons:user" width="24" height="24" />
                <span className='font-jakarta font-bold text-base text-[#3A3541]'>Prospect</span>
                </div>
            </button>
            <button>
                <div className='flex flex-row gap-1 '>
                <Icon icon="hugeicons:save-money-dollar" width="24" height="24" />
                <span className='font-jakarta font-bold text-base text-[#3A3541]'>Devis</span>
                </div>
            </button> <button>
                <div className='flex flex-row gap-1 '>
                <Icon icon="hugeicons:building-02" width="24" height="24" />
                <span className='font-jakarta font-bold text-base text-[#3A3541]'>Control</span>
                </div>
            </button> <button>
                <div className='flex flex-row gap-1 '>
                <Icon icon="hugeicons:muslim" width="24" height="24" />
                <span className='font-jakarta font-bold text-base text-[#3A3541]'>Équipe</span>
                </div>
            </button>
        </div>
<div className=' w-[20rem] flex flex-row h-full  justify-end items-center gap-3 mr-4'>
<Dropdown
    menu={{items}}
    >
 <a onClick={(e)=>e.preventDefault()}>
 <Space>

 </Space>
 <Avatar  icon={<UserOutlined/>}/>
 </a>
    </Dropdown>
        <button>  <Icon icon="hugeicons:notification-02" width="30" height="30"  style={{color: '#F7D47A'}} /></button>
        <button> <Icon icon="hugeicons:logout-square-02" width="30" height="30"  style={{color:' #ff3434'}} /></button>
      </div>
    </div>
  )
}

export default ProspectHeader 