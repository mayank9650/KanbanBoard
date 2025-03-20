/**
 * Segregates the tasks into todo, inProgress and done
 * @param {} apiData
 * @returns
 */
export const transformTasks = (apiData) => {
  return apiData?.todos?.reduce(
    (acc, task, index) => {
      const formattedTask = {
        id: task.id.toString(),
        title: task.todo,
        description: `Task by User ${task.userId}`, // Adding some description
      };

      if (task.completed) {
        acc.done.push(formattedTask);
      } else if (index % 2 === 0) {
        acc.inProgress.push(formattedTask); // Assign some to "inProgress"
      } else {
        acc.todo.push(formattedTask);
      }
      return acc;
    },
    { todo: [], inProgress: [], done: [] }
  );
};

export const initialTasks = {
  todo: [],
  inProgress: [],
  done: [],
};
