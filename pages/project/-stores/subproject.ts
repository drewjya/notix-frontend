import type { SubprojectData, SubprojectDto } from '~/types';

export const useProjectSubprojectStore = defineStore('ProjectSubprojectStore', () => {
    const dayjs = useDayjs();
    const list = ref<SubprojectData[]>([]);

    const isEmpty = computed(() => list.value.length <= 0);

    function setSubprojectList(dtoList: SubprojectDto[]) {
        list.value = dtoList.map((dto) => {
            return {
                id: dto.id,
                projectId: dto.projectId,
                name: dto.name,
                startDate: dayjs(dto.startDate).startOf('day'),
                endDate: dayjs(dto.endDate).endOf('day'),
            };
        });
    }

    function addSubproject(dto: SubprojectDto) {
        list.value.unshift({
            id: dto.id,
            projectId: dto.projectId,
            name: dto.name,
            startDate: dayjs(dto.startDate),
            endDate: dayjs(dto.endDate),
        });
    }

    function removeSubproject(subprojectId: string) {
        list.value = list.value.filter(subproject => subproject.id !== subprojectId);
    }

    return {
        list: readonly(list),
        isEmpty,
        setSubprojectList,
        addSubproject,
        removeSubproject,
    };
});
