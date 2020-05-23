using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class RecordingMenu : MonoBehaviour
{
    [SerializeField] GameObject PlayTriangle;
    [SerializeField] GameObject Pause;
    [SerializeField] Text textbox;
    [SerializeField] GameObject centerEye;
    private int toggle = 2;
    Recording recording;
    float timer;
    float recordingTime;
    bool started;
    //StartTimer timer;

    // Start is called before the first frame update
    void Start()
    {
        textbox.text = "";
        recordingTime = 0;
        started = false;
        //timer = new StartTimer(textbox);
        Pause.SetActive(false);
        PlayTriangle.SetActive(true);
        recording = new Recording();
        recording.Start();
        //PP();
    }

    public void ResetRecording()
    {
          
    }

    public void Save()
    {

        foreach (Workout workout in Networking.workouts)
        {
            workout.Stop();
        }
        this.PP();
    }

    public void TimerStart()
    {
        textbox.text = "Starting in 5";
        timer = 5;
        started = true;
    }

    public void PP()
    {
        
        if (toggle == 2)
        {
            TimerStart();
            toggle = 1;
        }
        else if (toggle == 1){
            StopRecording();
            toggle = 2;
            started = false;
            textbox.text = "";
        }


    }
    public void StartRecording()
    {
        Pause.SetActive(true);
        PlayTriangle.SetActive(false);
        recordingTime = 0;
        recording.StartRecording();

    }

    public void StopRecording()
    {
        Pause.SetActive(false);
        PlayTriangle.SetActive(true);
        recording.StopRecording(recordingTime);
        recording.ConvertToSaveableFormat();
        //Networking.workout.Pause();

    }

    // Update is called once per frame
    void Update()
    {

        if (started)
        {
            if (timer > 1)
            {
                timer -= Time.deltaTime;
                textbox.text = "Starting in " + (int)timer;
            }
            else if (timer > 0)
            {
                textbox.text = "Recording";
                StartRecording();
                timer = -1;
            }
            else
            {
                textbox.text = "Recording";
                recordingTime += Time.deltaTime;
                recording.SaveFrame(centerEye.transform.position);
            }
        }
        else
        {
            textbox.text = "";
        }
    }
}
