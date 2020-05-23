using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Leap;

public class NuitrackTracking : MonoBehaviour
{
/*
    string message = "";
    public nuitrack.JointType[] jointTypes;
    GameObject[] jointObjects;
    public GameObject PrefabJoint;
    Camera mainCamera;
    Vector3 skeletonToCameraTransform;
    int frameCount;
    GameObject leftWrist;
    GameObject rightWrist;
    Vector3 leftWristPosition;
    bool calibrated;
    float rotationCalibrationAngle;


    [SerializeField] Transform head;
    [SerializeField] Rigidbody leftLeg, rightLeg;
    [SerializeField] Transform floor;
    Vector3 offset;
    Quaternion q180 = Quaternion.Euler(0f, 180f, 0f);
    Vector3 newPosLeft, newPosRight;

    CalibrationInfo calibration;


    // Start is called before the first frame update
    void Start()
    {
        
        jointObjects = new GameObject[jointTypes.Length];
        mainCamera = Camera.main;
        leftWrist = GameObject.Find("L_Palm");
        transform.localPosition = new Vector3(1, 1, 1);
        for (int i = 0; i < jointTypes.Length; i++)
        {
            jointObjects[i] = Instantiate(PrefabJoint);
            jointObjects[i].transform.SetParent(transform);
        }
        message = "Skeleton Created";
        frameCount = 0;
        calibrated = false;
        leftWristPosition = new Vector3(0, 0, 0);

        calibration = gameObject.GetComponent<CalibrationInfo>();
        
    }

    // Update is called once per frame
    void Update()
    {

        
        if (CurrentUserTracker.CurrentUser != 0)
        {
            ProcessSkeleton();
            message = "User found";
        }
        else
        {
            message = "User Not Found";
        }
    }

    private void ProcessSkeleton()
    {
        /*
        offset = head.position - (q180 * (CalibrationInfo.SensorOrientation * (0.001f * skeleton.GetJoint(nuitrack.JointType.Head).ToVector3())));
        newPosLeft = q180 * (CalibrationInfo.SensorOrientation * (0.001f * skeleton.GetJoint(nuitrack.JointType.LeftAnkle).ToVector3())) + offset;

        newPosRight = q180 * (CalibrationInfo.SensorOrientation * (0.001f * skeleton.GetJoint(nuitrack.JointType.RightAnkle).ToVector3())) + offset;

        if (newPosLeft.y < floor.position.y)
        {
            newPosLeft = new Vector3(newPosLeft.x, floor.position.y, newPosLeft.z);
        }

        if (newPosRight.y < floor.position.y)
        {
            newPosRight = new Vector3(newPosRight.x, floor.position.y, newPosRight.z);
        }
        */
/*
    }

    private void FixedUpdate()
    {
        leftLeg.MovePosition(newPosLeft);
        rightLeg.MovePosition(newPosRight);
    }
    private void OnGUI()
    {
        GUI.color = Color.red;
        GUI.skin.label.fontSize = 50;
        GUILayout.Label(message);
    }
*/
}
