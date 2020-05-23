using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class Networking : MonoBehaviour
{
    public Workout workout;
    public static List<Workout> workouts;
    [SerializeField] GameObject workoutContainer;
    [SerializeField] GameObject[] preloadedExercises;
    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(GetText());
        if (workouts == null)
        {
            workouts = new List<Workout>();
        }
    }

    IEnumerator GetText()
    {
        UnityWebRequest www = UnityWebRequest.Get("https://recovry.azurewebsites.net");
        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            // Show results as text
            Debug.Log(www.downloadHandler.text);

            // Or retrieve results as binary data
            byte[] results = www.downloadHandler.data;
        }
        workout = new Workout();
        foreach (GameObject exerciseObject in preloadedExercises)
        {
            workout.AddExercise(exerciseObject);

        }

        //Exercise 
        workout.isActive = true;
        workouts.Add(workout);
    }
}

public class Workout
{
    public List<Exercise> exercises;
    public bool isActive;
    int currentWorkoutIndex = 0;
    public Workout()
    {
        exercises = new List<Exercise>();
    }
    public void AddExercise(GameObject exerciseModel)
    {
        Exercise curExercise = new Exercise
        {
            loadedExercise = exerciseModel
        };
        exercises.Add(curExercise);
    }

    public void Skip()
    {
        exercises[currentWorkoutIndex].loadedExercise.SetActive(false);
        exercises[currentWorkoutIndex].loadedExercise.GetComponent<Animator>().enabled = false;
        currentWorkoutIndex = (currentWorkoutIndex + 1) % exercises.Count;
        exercises[currentWorkoutIndex].loadedExercise.SetActive(true);
        exercises[currentWorkoutIndex].loadedExercise.GetComponent<Animator>().enabled = false;
        this.Play();
    }
    public void Stop()
    {
        exercises[currentWorkoutIndex].loadedExercise.SetActive(false);
        currentWorkoutIndex = 0;
        exercises[currentWorkoutIndex].loadedExercise.GetComponent<Animator>().enabled = false;
        //this.Pause();

    }
    public void Play()
    {
        exercises[currentWorkoutIndex].loadedExercise.SetActive(true);
        exercises[currentWorkoutIndex].loadedExercise.GetComponent<Animator>().enabled = true;
    }
    public void Pause()
    {
        //exercises[currentWorkoutIndex].loadedExercise.SetActive(false);
        exercises[currentWorkoutIndex].loadedExercise.GetComponent<Animator>().enabled = false;
    }

}

public class Exercise
{
    public GameObject loadedExercise;
}
