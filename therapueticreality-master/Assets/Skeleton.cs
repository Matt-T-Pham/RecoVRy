using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace networking
{
    [Serializable]
    public class Skeleton
    {
        public Skeleton(nuitrack.Skeleton skeleton)
        {
            this.ID = skeleton.ID;
            this.Joints = skeleton.Joints.Select(x => (Joint)x).ToArray();
        }

        public Skeleton()
        {

        }

        public static explicit operator Skeleton(nuitrack.Skeleton _skeleton)
        {
            Skeleton skeleton = new Skeleton();
            skeleton.ID = _skeleton.ID;
            skeleton.Joints = _skeleton.Joints.Select(x => {
                return (Joint)x;
                }).ToArray();
            return skeleton;
        }

        public int ID;
        public Joint[] Joints;
    }
}