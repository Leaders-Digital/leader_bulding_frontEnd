
import React, { useEffect, useState } from 'react'
import useCompletedActivites from '../../../../../../../Hooks/ActivitiesHooks/useCompletedActivites';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Collapse, Divider, List, Skeleton } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';

const CompletedActivities = ({id,revalidate}) => {
       const [activitiesData, setActivitiesData] = useState([]); 
    const [page, setPage] = useState(1);
    const{activities,error,isLoading,totalItems,mutate}=useCompletedActivites( { current: page, pageSize: 7 }, 
        id)
        useEffect(()=>{
          setPage(1)
          setActivitiesData([])
          mutate()

        },[id,mutate,revalidate])

           useEffect(() => {
                if (activities && !isLoading) {
                    if (page === 1) {
                        setActivitiesData(activities);
                    } else {
                        setActivitiesData(prev => [...prev, ...activities]);
                    }
                }
            }, [activities, isLoading, page]);
            const loadMoreData = () => {
                if (!isLoading && !error && activitiesData.length < totalItems) {
                    setPage(prev => prev + 1);
                }
            };
        
            if (error) {
                return <div>Error loading activities</div>;
            }
  return (
    <div
    id="completedScrollableDiv"
    className='bg-white rounded-lg mt-4 w-full h-[calc(100vh-16rem)] md:h-96'
    style={{
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
    }}
>
    <InfiniteScroll
        dataLength={activitiesData.length}
        next={loadMoreData}
        hasMore={activitiesData.length < totalItems}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="completedScrollableDiv"
    >
        <List
            className='rounded-lg'
            dataSource={activitiesData}
            renderItem={(activity) => (
                <List.Item key={activity.id}>
                   <div className='flex flex-col gap-1 w-full'>
                    <div className='flex flex-col md:flex-row gap-4 md:gap-7 justify-between'>
                   <div className='flex flex-col sm:flex-row gap-2'>
                      <div className='flex flex-col gap-3 w-full sm:w-40'>
                        <span className='font-jakarta font-semibold'>Activité</span>
                        <span className='font-jakarta font-semibold break-words'>{activity.activity}</span>
                      </div>
                    
                      <div className='flex flex-col gap-3 w-full sm:w-80'>
                        <span className='font-jakarta font-semibold'>Date</span>
                        <span className='text-[#17A937] font-jakarta font-bold text-sm md:text-base break-words'>
                          Date: {new Date(activity.date).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })} - Heures: {new Date(activity.date).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                          })}
                        </span>
                      </div>
                    </div>
                    
                 
                    </div>
                    {activity.description && activity.description.length > 0 && (
                      <div className='w-full md:w-[70rem]'>
                        <Collapse  
                          items={[{
                            label: "Notes",
                            key: '1', 
                            children: activity.description.map((desc, index) => (
                              <p key={index} className="break-words">{desc}</p>
                            ))
                          }]}
                        />
                      </div>  
                    )}
                    </div>
                </List.Item>
            )}
        />
    </InfiniteScroll>
</div>
  )
}

export default CompletedActivities