import React, { useEffect, useState } from 'react'
import useMeetings from '../../../../../../Hooks/MeetingsHooks/useMeetings'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Divider, List, Skeleton } from 'antd'
import { useParams } from 'react-router-dom'

const MeetingsInfinityScroll = ({filters,id}) => {
    const[meetingsData,setMeetingsData]=useState([])
    const[page,setPage]=useState(1)
    
      const {meetings,error,isLoading,meetingsMutatio,totalItems,totalPages}=useMeetings(filters,{current:page, pageSize:7},id)
console.log("meetings from inifite ",meetings)
useEffect((()=>{
    if(meetings){
        if (meetings && meetings.length > 0) {
            setMeetingsData((prevMeetings) => [...prevMeetings, ...meetings])
        }
    }
}),[meetings,filters,page])
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
      dataLength={meetingsData.length}
      next={loadMoreData}
      hasMore={meetingsData.length < totalItems || page <= totalPages}
      loader={
        <Skeleton
          avatar
          paragraph={{
            rows: 1,
          }}
          active
        />
      }
      endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
      scrollableTarget="scrollableDiv"
    >
      <List
        dataSource={meetingsData}
        renderItem={(meeting) => (
          <List.Item key={meeting.id}>
            <List.Item.Meta
            
              title={ <span className='font-jakarta font-semibold'>{meeting.title} : {meeting.location} </span>}
              description={new Date(meeting.date).toLocaleString()}
            />
            <div> {meeting.location}</div>
          </List.Item>
        )}
      />
    </InfiniteScroll>
  </div>
  )
}

export default MeetingsInfinityScroll