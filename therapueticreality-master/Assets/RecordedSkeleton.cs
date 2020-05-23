using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RecordedSkeleton : MonoBehaviour
{
    [SerializeField] GameObject jointPrefab = null, connectionPrefab = null;
    [SerializeField] Transform headTransform; //if not null, skeletonAvatar will move it
    [SerializeField] Transform headDirectionTransform; //part of head preab that rotates 
    [SerializeField] bool rotate180 = true;
    //[SerializeField]bool headInNeck = true;
    [SerializeField] Vector3 neckHMDOffset = new Vector3(0f, 0.15f, 0.08f); //TODO: add offset from neck
    [SerializeField] Vector3 startPoint;
    [SerializeField] Vector3 personOffset;
    [SerializeField] GameObject centerEye;
    SkeletonAvatar skeletonAvatar;
    public static float recordedTime;
    public float curTime;
    float speedModifier;
    public static List<nuitrack.Skeleton> frames;
    public static List<Vector3> centerEyePosition;
    public bool repeat = true;
    // Start is called before the first frame update
    void Start()
    {
        curTime = 0;
        speedModifier = 1;
        skeletonAvatar = this.gameObject.AddComponent<SkeletonAvatar>();

        //skeletonAvatar = new SkeletonAvatar(jointPrefab, connectionPrefab, headTransform, headDirectionTransform, rotate180, neckHMDOffset, startPoint, personOffset, centerEye);
        skeletonAvatar.SetSerializedFields(jointPrefab, connectionPrefab, headTransform, headDirectionTransform, rotate180, neckHMDOffset, startPoint, personOffset, centerEye);
        skeletonAvatar.CreateSkeletonParts();
    }

    void Update()
    {
        if (frames != null && frames.Count > 0)
        {
            //Calculate correct placement in recording
            /*
            List<string> jsonSum = new List<string>();
            List<networking.Skeleton> serSkeleton = frames.ConvertAll<networking.Skeleton>(x => {
                return (networking.Skeleton)x;
                });
            foreach (var skel in serSkeleton)
            {
                jsonSum.Add(JsonUtility.ToJson(skel));
            }
            var json = JsonUtility.ToJson(jsonSum);
            var val0 = JsonUtility.ToJson(serSkeleton, true);
            var val1 = JsonUtility.ToJson(serSkeleton[0], true);
            var val2 = JsonUtility.ToJson(serSkeleton[0].Joints[0], true);
            */
            curTime = curTime + Time.deltaTime;
            float timeIndex = (curTime / recordedTime) * speedModifier;
            int frameIndex = (int)(timeIndex * frames.Count);
            if (frameIndex >= frames.Count)
            {
                if (repeat)
                {
                    curTime = 0;
                    frameIndex = 0;
                }
                else
                {
                    return;
                }
            }

            skeletonAvatar.ProcessSkeleton(frames[frameIndex], centerEyePosition[frameIndex]);
        }
    }

    public void ChangeRecording(List<nuitrack.Skeleton> newFrames)
    {
        frames = newFrames;
    }

    
}