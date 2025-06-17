import dayjs from "dayjs";

const useProjectPhases = (project) => {
    // Transform the phases from the project data
    const formattedPhases = Array.isArray(project?.phases) ? project.phases.map(phase => ({
        name: phase.name || '',
        status: phase.status || 'en attente',
        pourcentage: parseInt(phase.pourcentage) || 0,
        startDate: phase.startDate ? dayjs(phase.startDate) : null,
        finishDate: phase.finishDate ? dayjs(phase.finishDate) : null,
        projectId: project._id
    })) : [];

    return {
        phases: formattedPhases,
        isLoading: false,
        error: null,
        mutate: () => {} // No-op since we're not using SWR anymore
    };
};

export default useProjectPhases;



