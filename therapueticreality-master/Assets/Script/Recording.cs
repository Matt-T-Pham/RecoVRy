using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

public class Recording
{
    public List<nuitrack.Skeleton> frames;
    public List<Vector3> centerEyePosition;
    bool isRecording;
    float recordingTime;

    // Start is called before the first frame update
    public void Start()
    {
        isRecording = false;
        frames = new List<nuitrack.Skeleton>();
        centerEyePosition = new List<Vector3>();
        //PP();
    }


    
    public void SaveFrame(Vector3 _centerEyePosition)
    {
        
        if (isRecording)
        {
            if (CurrentUserTracker.CurrentSkeleton != null)
            {
                nuitrack.Skeleton curSkeleton = new nuitrack.Skeleton(CurrentUserTracker.CurrentSkeleton.ID, (nuitrack.Joint[])CurrentUserTracker.CurrentSkeleton.Joints.Clone());
                frames.Add(curSkeleton);
                centerEyePosition.Add(_centerEyePosition);
            }
        }
    }
    public void StartRecording()
    {
        recordingTime = 0;
        frames = new List<nuitrack.Skeleton>();
        centerEyePosition = new List<Vector3>();
        isRecording = true;
    }

    public void StopRecording(float recordedTime)
    {
        isRecording = false;
        RecordedSkeleton.frames = frames;
        RecordedSkeleton.centerEyePosition = centerEyePosition;
        RecordedSkeleton.recordedTime = recordedTime;
    }

    public void ConvertToSaveableFormat()
    {
        foreach (var skeleton in frames)
        {
            skeleton.ToString();
        }
    }
}
