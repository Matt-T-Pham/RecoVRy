using UnityEngine;
using System.Collections.Generic;

public class RiggedAvatar : MonoBehaviour
{
    [Header("Rigged model")]
    [SerializeField]
    ModelJoint[] modelJoints;
    string message;

    /// <summary> Model bones </summary>
    Dictionary<nuitrack.JointType, ModelJoint> jointsRigged = new Dictionary<nuitrack.JointType, ModelJoint>();

    void Start()
    {
        for (int i = 0; i < modelJoints.Length; i++)
        {
            modelJoints[i].baseRotOffset = modelJoints[i].bone.rotation;
            jointsRigged.Add(modelJoints[i].jointType, modelJoints[i]);
        }
    }

    void Update()
    {
        if (CurrentUserTracker.CurrentSkeleton != null)
        {
            ProcessSkeleton(CurrentUserTracker.CurrentSkeleton);
        }
        {
            //message = "found person";
        }
    }

    void ProcessSkeleton(nuitrack.Skeleton skeleton)
    {
        //Calculate the model position: take the Torso position and invert movement along the Z axis
        Vector3 torsoPos = Quaternion.Euler(0f, 180f, 0f) * (0.001f * skeleton.GetJoint(nuitrack.JointType.Torso).ToVector3());
        transform.position = torsoPos;
        OVRPlayerController player = FindObjectOfType<OVRPlayerController>();
        var centerEye = GameObject.FindGameObjectWithTag("MainCamera");
        Vector3 headsetPos = centerEye.transform.position;
        message = "headset: " + headsetPos.ToString() + ", Chan: " + modelJoints[0].bone.position;

        foreach (var riggedJoint in jointsRigged)
        {
            //Get joint from the Nuitrack
            nuitrack.Joint joint = skeleton.GetJoint(riggedJoint.Key);

            ModelJoint modelJoint = riggedJoint.Value;

            //Calculate the model bone rotation: take the mirrored joint orientation, add a basic rotation of the model bone, invert movement along the Z axis
            Quaternion jointOrient = Quaternion.Inverse(CalibrationInfo.SensorOrientation) * (joint.ToQuaternionMirrored()) * modelJoint.baseRotOffset;
            modelJoint.bone.rotation = jointOrient;
        }
        var chan = GameObject.Find("unitychan");
        chan.transform.localPosition += headsetPos - modelJoints[0].bone.position;
        chan.transform.localPosition -=  new Vector3(0,.5f,0);

    }
    private void OnGUI()
    {
        GUI.color = Color.red;
        GUI.skin.label.fontSize = 50;
        GUILayout.Label(message);
    }
}