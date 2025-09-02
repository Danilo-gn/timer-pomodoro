import type { TaskStateModel } from "../../models/TaskStateModel";
import { TaskActionTypes, type TaskActionModel } from "./TaskActions";
import { getNextCycle } from "../../utils/getNextCycle";
import { formatSecondsTominutes } from "../../utils/formatSecondsToMinutes";

export function taskReducer(state: TaskStateModel, action: TaskActionModel): TaskStateModel {
    switch (action.type) {
        case TaskActionTypes.START_TASK: {
            const newTask = action.payload;
            const nextCycle = getNextCycle(state.currentCycle);
            const secondsRemaining = newTask.duration * 60;

            return {
                ...state,
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining,
                formattedSecondsReamianing: formatSecondsTominutes(secondsRemaining),
                tasks: [...state.tasks, newTask]
            };
        }
        case TaskActionTypes.INTERRUPT_TASK: {
            return {
                ...state,
                activeTask: null,
                secondsRemaining: 0,
                formattedSecondsReamianing: '00:00',
                tasks: state.tasks.map(task => {
                    if ( state.activeTask && state.activeTask.id === task.id ) {
                        return {...task, interruptDate: Date.now() }
                    }
                    return task;
                })
            };
        }
        case TaskActionTypes.RESET_STATE: {
            return state;
        }
    }

    return state;
}