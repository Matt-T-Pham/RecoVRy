using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;

public delegate void Task();

public class TaskExecuter : MonoBehaviour
{
    private Queue<Task> taskQueue = new Queue<Task>();
    private object _queueLock = new object();

    static TaskExecuter()
    {

    }

    private TaskExecuter()
    {

    }

    // Start is called before the first frame update
    void Start()
    {
        DontDestroyOnLoad(this.gameObject);
    }

    // Update is called once per frame
    void Update()
    {
        lock(_queueLock)
        {
            if (taskQueue.Count > 0)
            {
                taskQueue.Dequeue()();
            }
        }
    }

    public void ScheduleTask(Task task)
    {
        lock(_queueLock)
        {
            taskQueue.Enqueue(task);
        }
    }
}
