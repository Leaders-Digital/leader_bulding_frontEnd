import React, { useEffect, useState, useCallback } from 'react'
import useUpcomingActivities from '../../../../../../../Hooks/ActivitiesHooks/useUpcomingActivities'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Collapse, Divider, List, Skeleton } from 'antd'
import { Icon } from '@iconify/react/dist/iconify.js'

const UpcomingActivities = ({ id }) => {
    const [activitiesData, setActivitiesData] = useState([]); 
    const [page, setPage] = useState(1);
    const [loadedPages, setLoadedPages] = useState(new Set());
    const { activities, error, isLoading, totalItems } = useUpcomingActivities({ current: page, pageSize: 7 }, id);



    useEffect(() => {
      if (activities && activities.length > 0 && !loadedPages.has(page)) {
          setActivitiesData(prev => [...prev, ...activities]);  
          setLoadedPages(prev => new Set([...prev, page])); 
      }
  }, [activities, page, loadedPages]);

    const loadMoreData = useCallback(() => {
        if (!isLoading && !error) {
            setPage(prevPage => prevPage + 1);
        }
    }, [isLoading, error]);

    return (
        <div
            id="scrollableDiv"
            className='bg-white rounded-lg mt-4 w-full h-96'
            style={{
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            <InfiniteScroll
                dataLength={activitiesData.length || 0}  
                next={loadMoreData}
                hasMore={activitiesData.length < totalItems}  
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                className=' rounded-lg'
                    dataSource={activitiesData}
                    renderItem={(activity) => (
                        <List.Item key={activity.id}>
                           <div className='flex flex-col gap-1'>
                            <div className='flex flex-row gap-7 justify-between'>
                           <div className='flex flex-row gap-2'><div className='flex flex-col gap-3 w-40'><span className='font-jakarta font-semibold'>Activité</span>
                              <span className='font-jakarta font-semibold'>{activity.activity} </span>
                            </div>
                            
                            <div className='flex flex-col gap-3 w-80'>
  <span className='font-jakarta font-semibold'>Date</span>
                           <span className='text-[#17A937] font-jakarta font-bold'>
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
                         <div className='flex flex-col gap-1 justify-center items-center '>
                           <span className='font-jakarta font-semibold'>Actions</span>
                           <div className='flex flex-row gap-2'>

                           <button className='h-10 w-10 rounded-full bg-[#17A937] bg-opacity-20 flex flex-row items-center justify-center'><Icon icon="hugeicons:checkmark-circle-01" width="24" height="24"  style={{color:" #17A937"}} /></button>
                           < button className='h-10 w-10 rounded-full bg-[#9747FF] bg-opacity-20 flex flex-row items-center justify-center'><Icon icon="hugeicons:note-add" width="24" height="24"  style={{color: "#9747FF"}} /></button>
                           </div>

                           
                           </div> 
                            </div>
                            {(activity.description.length>0)? 
                         <div className='w-[70rem]' > <Collapse  
                           items={[{label:"Notes",key:'1', 
                            children: activity.description.map((desc, index) => (
                              <p key={index}>{desc}</p>
                            ))
                           }]}
                           /></div>  
                          
                          
                           :null}
                            </div>
                         
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default UpcomingActivities
