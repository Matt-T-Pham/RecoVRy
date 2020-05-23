using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MediaControlls : MonoBehaviour
{
    public GameObject squater;
    public GameObject burpeeer;
    public GameObject PlayTriangle;
    public GameObject Pause;
    static Animator anim;
    private int toggle = 1;

    // Start is called before the first frame update
    void Start()
    {
        squater = GameObject.Find("Squat");
        burpeeer = GameObject.Find("Burpee");
        PlayTriangle = GameObject.Find("PlayTriangle");
        Pause = GameObject.Find("PauseHolder");
        anim = GetComponent<Animator>();
        //PP();
    }

    public void Skip()
    {
        foreach( Workout workout in Networking.workouts)
        {
            workout.Skip();
        }       
    }

    public void Stop()
    {

        foreach (Workout workout in Networking.workouts)
        {
            workout.Stop();
        }
        this.PP();
    }

    public void PP()
    {
        
        if (toggle == 2)
        {
            play();
            toggle = 1;
        }
        else if (toggle == 1){
            pause();
            toggle = 2;
        }


    }
    public void play()
    {
        Pause.SetActive(true);
        PlayTriangle.SetActive(false);
        foreach (Workout workout in Networking.workouts)
        {
            workout.Play();
        }
        //Networking.workout.Play();
    }

    public void pause()
    {
        Pause.SetActive(false);
        PlayTriangle.SetActive(true);

        foreach (Workout workout in Networking.workouts)
        {
            workout.Pause();
        }
        //Networking.workout.Pause();

    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
