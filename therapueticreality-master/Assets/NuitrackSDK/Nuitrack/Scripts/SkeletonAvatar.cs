using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

public class SkeletonAvatar : MonoBehaviour 
{
    [SerializeField]GameObject jointPrefab = null, connectionPrefab = null;
    [SerializeField]Transform headTransform; //if not null, skeletonAvatar will move it
    [SerializeField]Transform headDirectionTransform; //part of head preab that rotates 
    [SerializeField]bool rotate180 = true;
    //[SerializeField]bool headInNeck = true;
    [SerializeField]Vector3 neckHMDOffset = new Vector3(0f, 0.15f, 0.08f); //TODO: add offset from neck
    [SerializeField] Vector3 startPoint;
    [SerializeField] Vector3 personOffset;
    TPoseCalibration tPC;
    Vector3 basePivotOffset;
    Vector3 basePivot;
    public static Vector3 leftHandPos, rightHandPos;
    string message;
    [SerializeField]GameObject centerEye;
    GameObject entireTransform;

    nuitrack.JointType[] jointsInfo = new nuitrack.JointType[]
    {
        nuitrack.JointType.Head,
        nuitrack.JointType.Neck,
        nuitrack.JointType.LeftCollar,
        nuitrack.JointType.Torso,
        nuitrack.JointType.Waist,
        nuitrack.JointType.LeftShoulder,
        nuitrack.JointType.RightShoulder,
        nuitrack.JointType.LeftElbow,
        nuitrack.JointType.RightElbow,
        nuitrack.JointType.LeftWrist,
        nuitrack.JointType.RightWrist,
        nuitrack.JointType.LeftHand,
        nuitrack.JointType.RightHand,
        nuitrack.JointType.LeftHip,
        nuitrack.JointType.RightHip,
        nuitrack.JointType.LeftKnee,
        nuitrack.JointType.RightKnee,
        nuitrack.JointType.LeftAnkle,
        nuitrack.JointType.RightAnkle
    };

    nuitrack.JointType[,] connectionsInfo = new nuitrack.JointType[,]
    { //right and left collars are at same point at the moment, so we use only 1 collar here,
        //quite easy to add rightCollar if it ever changes
        {nuitrack.JointType.Neck,           nuitrack.JointType.Head},
        {nuitrack.JointType.LeftCollar,     nuitrack.JointType.Neck},
        {nuitrack.JointType.LeftCollar,     nuitrack.JointType.LeftShoulder},
        {nuitrack.JointType.LeftCollar,     nuitrack.JointType.RightShoulder},
        {nuitrack.JointType.LeftCollar,     nuitrack.JointType.Torso},
        {nuitrack.JointType.Waist,          nuitrack.JointType.Torso},
        {nuitrack.JointType.Waist,          nuitrack.JointType.LeftHip},
        {nuitrack.JointType.Waist,          nuitrack.JointType.RightHip},
        {nuitrack.JointType.LeftShoulder,   nuitrack.JointType.LeftElbow},
        {nuitrack.JointType.LeftElbow,      nuitrack.JointType.LeftWrist},
        {nuitrack.JointType.LeftWrist,      nuitrack.JointType.LeftHand},
        {nuitrack.JointType.RightShoulder,  nuitrack.JointType.RightElbow},
        {nuitrack.JointType.RightElbow,     nuitrack.JointType.RightWrist},
        {nuitrack.JointType.RightWrist,     nuitrack.JointType.RightHand},
        {nuitrack.JointType.LeftHip,        nuitrack.JointType.LeftKnee},
        {nuitrack.JointType.LeftKnee,       nuitrack.JointType.LeftAnkle},
        {nuitrack.JointType.RightHip,       nuitrack.JointType.RightKnee},
        {nuitrack.JointType.RightKnee,      nuitrack.JointType.RightAnkle}
    };

    GameObject skeletonRoot;
    GameObject[] connections;
    Dictionary<nuitrack.JointType, GameObject> joints;
    Quaternion q180 = Quaternion.Euler(0f, 180f, 0f);
    Quaternion q0 = Quaternion.identity;

    public void SetSerializedFields(GameObject jointPrefab, GameObject connectionPrefab, Transform headTransform, Transform headDirectionTransform, bool rotate180, Vector3 neckHMDOffset, Vector3 startPoint, Vector3 personOffset, GameObject centerEye)
    {
        this.jointPrefab = jointPrefab;
        this.connectionPrefab = connectionPrefab;
        this.headTransform = headTransform;
        this.headDirectionTransform = headDirectionTransform;
        this.rotate180 = rotate180;
        this.neckHMDOffset = neckHMDOffset;
        this.startPoint = startPoint;
        this.personOffset = personOffset;
        this.centerEye = centerEye;
    }

    public void Start () 
    {
        //CreateSkeletonParts();
    }

    public void CreateSkeletonParts()
    {
        skeletonRoot = new GameObject();
        skeletonRoot.name = "SkeletonRoot";
        entireTransform = new GameObject();
        entireTransform.name = "entireTransform";
        //entireTransform.transform.parent = GameObject.Find("SkeletonAvatar").transform;
        entireTransform.transform.parent = this.gameObject.transform;
        skeletonRoot.transform.parent = entireTransform.transform;

        joints = new Dictionary<nuitrack.JointType, GameObject>();

        for (int i = 0; i < jointsInfo.Length; i++)
        {
            if (jointPrefab != null)
            {
                GameObject joint = (GameObject)Instantiate(jointPrefab, Vector3.zero, Quaternion.identity);
                joints.Add(jointsInfo[i], joint);
                joint.transform.parent = skeletonRoot.transform;
                joint.SetActive(false);
            }
        }

        connections = new GameObject[connectionsInfo.GetLength(0)];

        for (int i = 0; i < connections.Length; i++)
        {
            if (connectionPrefab != null)
            {
            GameObject conn = (GameObject)Instantiate(connectionPrefab, Vector3.zero, Quaternion.identity);
            connections[i] = conn;
            conn.transform.parent = skeletonRoot.transform;
            conn.SetActive(false);
            }
        }
    }

    void DeleteSkeletonParts()
    {
        Destroy(skeletonRoot);
        joints = null;
        connections = null;
    }
    


    public void ProcessSkeleton(nuitrack.Skeleton skeleton, Vector3 centerEyePosition)
    {
        
        if (skeleton == null) return;

        if (headTransform != null)
        {
            //if (headInNeck)
              //  headTransform.position = headDirectionTransform.rotation * neckHMDOffset + (rotate180 ? q180 : q0) * (Vector3.up * CalibrationInfo.FloorHeight + CalibrationInfo.SensorOrientation * (0.001f * skeleton.GetJoint(nuitrack.JointType.Neck).ToVector3()));
            //else
			#if UNITY_IOS
			headTransform.position = headDirectionTransform.rotation * neckHMDOffset + (rotate180 ? q180 : q0) * (Vector3.up * CalibrationInfo.FloorHeight + CalibrationInfo.SensorOrientation * (0.001f * skeleton.GetJoint(nuitrack.JointType.Neck).ToVector3())) + basePivotOffset;
			#else
			headTransform.position = (rotate180 ? q180 : q0) * (Vector3.up * CalibrationInfo.FloorHeight + CalibrationInfo.SensorOrientation * (0.001f * skeleton.GetJoint(nuitrack.JointType.None).ToVector3())) + basePivotOffset;
			#endif
                
				basePivot = (rotate180 ? q180 : q0) * (Vector3.up * CalibrationInfo.FloorHeight + CalibrationInfo.SensorOrientation * (0.001f * skeleton.GetJoint(nuitrack.JointType.Waist).ToVector3())) + basePivotOffset;
        }
        
        if (!skeletonRoot.activeSelf) skeletonRoot.SetActive(true);
  

        for (int i = 0; i < jointsInfo.Length; i++)
        {
            nuitrack.Joint j = skeleton.GetJoint(jointsInfo[i]);
            if (j.Confidence > 0.5f)
            {
                if (!joints[jointsInfo[i]].activeSelf) joints[jointsInfo[i]].SetActive(true);

                joints[jointsInfo[i]].transform.localPosition = (rotate180 ? q180 : q0) * (Vector3.up * CalibrationInfo.FloorHeight + CalibrationInfo.SensorOrientation * (0.001f *j.ToVector3())) + basePivotOffset;
                joints[jointsInfo[i]].transform.rotation = (rotate180 ? q180 : q0) * CalibrationInfo.SensorOrientation * j.ToQuaternionMirrored();
                //joints[jointsInfo[i]].transform.position += headsetPos - joints[jointsInfo[0]].transform.position;

                leftHandPos = (rotate180 ? q180 : q0) * (Vector3.up * CalibrationInfo.FloorHeight + CalibrationInfo.SensorOrientation * (0.001f * skeleton.GetJoint(nuitrack.JointType.LeftHand).ToVector3())) + basePivotOffset;
                rightHandPos = (rotate180 ? q180 : q0) * (Vector3.up * CalibrationInfo.FloorHeight + CalibrationInfo.SensorOrientation * (0.001f * skeleton.GetJoint(nuitrack.JointType.RightHand).ToVector3())) + basePivotOffset;
            }
            else
            {
                if (joints[jointsInfo[i]].activeSelf) joints[jointsInfo[i]].SetActive(false);
            }
        }


        OVRPlayerController player = FindObjectOfType<OVRPlayerController>();
        //var centerEye = GameObject.Find("CenterEyeAnchor");
        //Vector3 headsetPos = centerEye.transform.position;
        Vector3 headsetPos = centerEyePosition;
        //message = "headset: " + headsetPos.ToString() + ", skeleton: " + joints[jointsInfo[0]].transform.position;
        entireTransform.transform.position = (headsetPos - joints[jointsInfo[0]].transform.localPosition)/1.0f + personOffset;
        //entireTransform.transform.position = new Vector3(-0.1f, -0.5f, 1.7f);


        for (int i = 0; i < connectionsInfo.GetLength(0); i++)
        {
            if (joints[connectionsInfo[i, 0]].activeSelf && joints[connectionsInfo[i, 1]].activeSelf)
            {
                if (!connections[i].activeSelf) connections[i].SetActive(true);

                Vector3 diff = joints[connectionsInfo[i, 1]].transform.position - joints[connectionsInfo[i, 0]].transform.position;

                connections[i].transform.position = joints[connectionsInfo[i, 0]].transform.position;
                connections[i].transform.rotation = Quaternion.LookRotation(diff);
                connections[i].transform.localScale = new Vector3(1f, 1f, diff.magnitude);
            }
            else
            {
                if (connections[i].activeSelf) connections[i].SetActive(false);
            }
        }
        
        //var chan = GameObject.Find("SkeletonTransform");
        //chan.transform.localPosition += headsetPos - joints[jointsInfo[0]].transform.position;
        //chan.transform.localPosition -= new Vector3(0, .5f, 0);

    }

    void Awake()
    {
        tPC = FindObjectOfType<TPoseCalibration>();
    }

    void OnEnable()
    {
        tPC.onSuccess += OnSuccessCalib;
    }

    void OnDisable()
    {
        tPC.onSuccess -= OnSuccessCalib;
    }

    private void OnSuccessCalib(Quaternion rotation)
    {
        StartCoroutine(CalculateOffset());
    }

    public IEnumerator CalculateOffset()
    {
        yield return new WaitForEndOfFrame();
        yield return new WaitForEndOfFrame();
        basePivotOffset = startPoint - basePivot + basePivotOffset;
        basePivotOffset.x = 0;
    }

    void OnDestroy()
    {
        DeleteSkeletonParts();
    }
    private void OnGUI()
    {
        GUI.color = Color.red;
        GUI.skin.label.fontSize = 50;
        GUILayout.Label(message);
    }
}