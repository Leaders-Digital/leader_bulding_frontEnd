import React, {useCallback, useMemo, useState} from 'react';
import ProjectPhasesHeader from './ProjectPhasesHeader';
import ProjectPhasesTable from './ProjectPhasesTable';
import useProjects from '../../../../../../Hooks/ProjectHooks/useProjects';

const ProjectPhasesPage = () => {
    const [filter, setFilter] = useState({search: ''});

    const stableFilter = useMemo(() => ({search: "", status: ""}), []);
    const stablePagination = useMemo(() => ({current: 1, pageSize: 1000}), []);
    const {projects} = useProjects(stableFilter, stablePagination);

    const handleFilterChange = useCallback((newFilter) => {
        setFilter(newFilter);
    }, []);

    const memoizedProjects = useMemo(() => projects || [], [projects]);
    return (
        <div className="p-6">
            <ProjectPhasesHeader onFilterChange={handleFilterChange}/>
            <ProjectPhasesTable
                filter={filter}
                projects={memoizedProjects}
            />
        </div>
    );
};

export default ProjectPhasesPage;