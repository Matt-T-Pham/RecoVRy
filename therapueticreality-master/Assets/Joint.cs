using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace networking
{
    [Serializable]
    public enum JointType
    {
        None = 0,
        Head = 1,
        Neck = 2,
        Torso = 3,
        Waist = 4,
        LeftCollar = 5,
        LeftShoulder = 6,
        LeftElbow = 7,
        LeftWrist = 8,
        LeftHand = 9,
        LeftFingertip = 10,
        RightCollar = 11,
        RightShoulder = 12,
        RightElbow = 13,
        RightWrist = 14,
        RightHand = 15,
        RightFingertip = 16,
        LeftHip = 17,
        LeftKnee = 18,
        LeftAnkle = 19,
        LeftFoot = 20,
        RightHip = 21,
        RightKnee = 22,
        RightAnkle = 23,
        RightFoot = 24
    }

    [Serializable]
    public struct Orientation
    {
        public float[] Matrix;
    }

    [Serializable]
    public struct Joint
    {
        public JointType Type;
        public float Confidence;
        public Vector3 Real;
        public Vector3 Proj;
        //public nuitrack.Orientation Orient { get; set; }
        public static explicit operator Joint(nuitrack.Joint _joint)
        {
            Joint joint = new Joint();
            joint.Type = (JointType)(int)_joint.Type;
            joint.Confidence = _joint.Confidence;
            Vector3 real = new Vector3(_joint.Real.X, _joint.Real.Y, _joint.Real.Z);
            Vector3 proj = new Vector3(_joint.Proj.X, _joint.Proj.Y, _joint.Proj.Z);
            //Vector3 real = new Vector3();
            //Vector3 proj = new Vector3();
            joint.Real = real;
            joint.Proj = proj;
            return joint;

        }
    }
}
