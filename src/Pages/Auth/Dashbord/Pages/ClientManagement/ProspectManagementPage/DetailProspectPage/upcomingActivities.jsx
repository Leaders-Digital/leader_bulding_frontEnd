import React, { useEffect, useState } from 'react'
import useUpcomingActivities from '../../../../../../../Hooks/ActivitiesHooks/useUpcomingActivities'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Divider, List, Skeleton } from 'antd'

const UpcomingActivities = ({id}) => {
    const[activitiesData,setActivitiesData]=useState([])
    const[page,setPage]=useState(1)
    const {activities,error,isLoading,totalItems,totalPages}=useUpcomingActivities({current:page, pageSize:7},id)
 console.log("activies upcoming",activities)
    useEffect((()=>{
     if(activities){
        if(activities && activities.length>0){
            setActivitiesData((prev)=>[...prev,...activities])
        }
     }

    }),[activities,page])
    const loadMoreData=()=>{
        if(isLoading || error) return;
        setPage(prevPage => prevPage + 1)
    }
  return (
    <div
    id="scrollableDiv"
    className='bg-white rounded-lg mt-4'
    style={{
      height: 400,
      overflow: 'auto',
      padding: '0 16px',
      border: '1px solid rgba(140, 140, 140, 0.35)',
      width:500,
    }}
    > 
    <InfiniteScroll
    dataLength={activitiesData.length}
    next={loadMoreData}
    hasMore={activitiesData.length < totalItems || page <= totalPages}
    loader={
        <Skeleton avatar paragraph={{rows:1}} active />
    }
    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
    >
    <List 
    dataSource={activitiesData}
    renderItem={(activity)=>(
        <List.Item key={activity.id}>

            <List.Item.Meta
              title={ <span className='font-jakarta font-semibold'>{activity.activity}  </span>}
              description={new Date(activity.date).toLocaleString()}
            />
        </List.Item>
    )}
    />
    </InfiniteScroll>
    </div>
  )
}

export default UpcomingActivities