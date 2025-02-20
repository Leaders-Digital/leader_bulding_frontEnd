import React, { useEffect, useState } from 'react'
import useUpcomingActivities from '../../../../../../../Hooks/ActivitiesHooks/useUpcomingActivities'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Collapse, Divider, List, Modal, Skeleton } from 'antd'
import { Icon } from '@iconify/react/dist/iconify.js'
import DoneActivityForm from '../../../../../../../Forms/ProspecClientForms/ActivitesForms/doneActivityForm'
import AddNoteForm from '../../../../../../../Forms/ProspecClientForms/ActivitesForms/addNoteForm'

const UpcomingActivities = ({ id, refreshTrigger,onSuccess,revalidate }) => {
    const [activitiesData, setActivitiesData] = useState([]); 
    const [page, setPage] = useState(1);
    const[modalOpen,setModalOpen]=useState()
    const[selectedActivity,setSelectedActivity]=useState()
    const[noteModal,setNoteModal]=useState()
    const[activityNote,setActivityNote]=useState()
    const { activities, error, isLoading, totalItems, mutate } = useUpcomingActivities(
        { current: page, pageSize: 7 }, 
        id
    );

    useEffect(() => {
        setPage(1);
        setActivitiesData([]);
        mutate();
    }, [id, refreshTrigger, mutate,revalidate]);

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
        if (!isLoading && !error && activitiesData?.length < totalItems) {
            setPage(prev => prev + 1);
        }
    };

    if (error) {
        return <div>Error loading activities</div>;
    }

    return (
        <div
            id="upcomingScrollableDiv"
            className='bg-white rounded-lg mt-4 w-full h-[calc(100vh-16rem)] md:h-96'
            style={{
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            <InfiniteScroll
                dataLength={activitiesData?.length || 0}
                next={loadMoreData}
                hasMore={activitiesData?.length < totalItems}
                loader={
                    <div className="loading-indicator">
                        <Skeleton avatar paragraph={{ rows: 1 }} active />
                    </div>
                }
                scrollableTarget="upcomingScrollableDiv"
                endMessage={
                    <Divider plain>
                        {activitiesData?.length > 0 ? "It is all, nothing more 🤐" : "No upcoming activities"}
                    </Divider>
                }
            >
                <List
                    className='rounded-lg'
                    dataSource={activitiesData}
                    renderItem={(activity) => (
                        <List.Item key={activity._id}>
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
                            
                            <div className='flex flex-col gap-1 justify-center items-center'>
                              <span className='font-jakarta font-semibold'>Actions</span>
                              <div className='flex flex-row gap-2'>
                                <button className='h-8 w-8 md:h-10 md:w-10 rounded-full bg-[#17A937] bg-opacity-20 flex flex-row items-center justify-center' onClick={()=>{setModalOpen(true);setSelectedActivity(activity._id)} }>
                                  <Icon icon="hugeicons:checkmark-circle-01" className="w-5 h-5 md:w-6 md:h-6" style={{color:" #17A937"}} />
                                </button>
                                <button className='h-8 w-8 md:h-10 md:w-10 rounded-full bg-[#9747FF] bg-opacity-20 flex flex-row items-center justify-center' onClick={()=>{setNoteModal(true);setActivityNote(activity._id)}}>
                                  <Icon icon="hugeicons:note-add" className="w-5 h-5 md:w-6 md:h-6" style={{color: "#9747FF"}} />
                                </button>
                              </div>
                            </div> 
                            </div>
                            {activity.description && activity.description?.length > 0 && (
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
            <Modal
            title={<span className=' font-jakarta text-xl  font-bold size-6  my-8 text-[#17A937] '>Terminer une activité </span>}
            open={modalOpen}
            footer={null}
            className='h-[60rem] w-[40rem] px-3 py-3'
            width={"40rem"}
            height={"60rem"}
            style={{height: "60rem", 
              padding: "1rem",}}
              onCancel={()=>{setModalOpen(false) ; setSelectedActivity(null)}}
            >

              <DoneActivityForm id={selectedActivity} setModal={setModalOpen} onSuccess={onSuccess}/>
            </Modal>
            
            
            <Modal
            title={<span className=' font-jakarta text-xl  font-bold size-6  my-8 text-[#191B1C] '>Terminer une activité </span>}
            open={noteModal}
            footer={null}
            className='h-[60rem] w-[40rem] px-3 py-3'
            width={"40rem"}
            height={"60rem"}
            style={{height: "60rem", 
              padding: "1rem",}}
            onCancel={()=>{setNoteModal(false);setActivityNote(null)}}
            >
             <AddNoteForm id={activityNote} openModal={setNoteModal}/>
            </Modal>
        </div>
    );
};

export default UpcomingActivities;
