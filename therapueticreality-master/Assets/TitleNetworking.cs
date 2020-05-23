
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;
using System.Diagnostics;
using System.Threading;
using System.IO.Pipes;
using System.Text;

public class TitleNetworking : MonoBehaviour
{
    private Thread pipeThread;
    NamedPipeServerStream pipe;
    TaskExecuter taskExecuter;
    //int count = 0;
    // Start is called before the first frame update
    void Start()
    {
        DontDestroyOnLoad(this.gameObject);
        taskExecuter = this.gameObject.GetComponent<TaskExecuter>();
        pipeThread = new Thread(PipeThread);
        pipeThread.Start();
        UnityEngine.Debug.Log("start thread");
    }

    // Update is called once per frame
    void Update()
    {

    }

    private void PipeThread()//pipe server thread
    {
        //GameObject eventSystem = GameObject.Find("EventSystem");
        //TaskExecuter taskExecuter = eventSystem.GetComponent<TaskExecuter>();


        pipe = new NamedPipeServerStream("testpipe", PipeDirection.InOut, 1);
        UnityEngine.Debug.Log("wait for client");
        pipe.WaitForConnection();
        UnityEngine.Debug.Log("client Connected");

        while (pipe.IsConnected)
        {
            byte[] buffer = new byte[256];
            Thread.Sleep(100);
            pipe.Read(buffer, 0, 256);
            string message = Encoding.ASCII.GetString(buffer);
            UnityEngine.Debug.Log(message);
            if (message.Contains("johnnny"))
            {
                taskExecuter.ScheduleTask(SwitchToRecovry);
            }
            
            pipe.Flush();
            buffer = new byte[256];
            SendTo("HelloWorld");
        }

    }

    public static void SwitchToRecovry()
    {
        SceneManager.LoadScene("RecoVRy");
    }

    public void SendTo(string message)
    {
        if (pipe.IsConnected)
        {
            byte[] trasnferData = Encoding.ASCII.GetBytes(message + "\n");
            int len = trasnferData.Length;
            pipe.Write(trasnferData, 0, len);
            pipe.Flush();
        }
    }

    void OnApplicationQuit()
    {
        pipeThread.Abort();
        UnityEngine.Debug.Log("end Thread");
    }
}