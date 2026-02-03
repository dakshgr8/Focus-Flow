export interface Task {
    id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
    dueDate?: Date;
    parentId?: string; // For micro-tasks
}

export interface Goal {
    id: string;
    title: string;
    tasks: Task[];
    progress: number;
}

export type TimeBlockStatus = 'done' | 'missed' | 'in-progress' | 'upcoming';

export interface TimeBlock {
    id: string;
    day: string; // 'Monday', 'Tuesday', etc.
    startTime: string; // '10:00'
    endTime: string; // '11:00'
    title: string;
    type: 'class' | 'study';
    status: TimeBlockStatus;
}


