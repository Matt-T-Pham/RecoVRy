using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;

public class StartTimer : MonoBehaviour
{
    public int[,] frames;
    [SerializeField] Text textbox;
    float timer;
    bool started;
    Action timerOverAction;
    public StartTimer(Text textbox)
    {
        this.textbox = textbox;
    }

    // Start is called before the first frame update
    void Start()
    {
        textbox.text = "";
        started = false;
    }

    public void TimerStart(Action action)
    {
        timerOverAction = action;
        textbox.text = "Starting in 5";
        timer = 5;
        started = true;
    }
    // Update is called once per frame
    void Update()
    {
        if (timer > 1)
        {
            timer -= Time.deltaTime;
            textbox.text = "Starting in " + (int)timer;
        }
        else if (started)
        {
            textbox.text = "Recording";
        }
        else
        {
            textbox.text = "";
        }
        
        
    }
}
