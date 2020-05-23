using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerSkeleton : MonoBehaviour
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
    // Start is called before the first frame update
    void Start()
    {
        skeletonAvatar = this.gameObject.AddComponent<SkeletonAvatar>();

        //skeletonAvatar = new SkeletonAvatar(jointPrefab, connectionPrefab, headTransform, headDirectionTransform, rotate180, neckHMDOffset, startPoint, personOffset, centerEye);
        skeletonAvatar.SetSerializedFields(jointPrefab, connectionPrefab, headTransform, headDirectionTransform, rotate180, neckHMDOffset, startPoint, personOffset, centerEye);
        skeletonAvatar.CreateSkeletonParts();
    }

    void Update()
    {
        if (CurrentUserTracker.CurrentSkeleton != null)
        {
            skeletonAvatar.ProcessSkeleton(CurrentUserTracker.CurrentSkeleton, centerEye.transform.position);
        }
    }
}
