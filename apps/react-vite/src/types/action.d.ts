interface Action {
    type: string;
    [key: string]: any; // Additional properties based on action type
}

export {
    Action
};
