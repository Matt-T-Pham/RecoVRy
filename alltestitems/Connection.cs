using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Diagnostics;
using System.Threading;
using System.IO.Pipes;
using System.Text;

public class Connection : MonoBehaviour
{
    private Thread pipeThread;
    NamedPipeServerStream pipe;
    //int count = 0;
    // Start is called before the first frame update
    void Start()
    {
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
        pipe = new NamedPipeServerStream("testpipe", PipeDirection.InOut, 1);
        UnityEngine.Debug.Log("wait for client");
        pipe.WaitForConnection();
        UnityEngine.Debug.Log("client Connected");

        while(pipe.IsConnected)
        {
            byte[] buffer = new byte[256];
            Thread.Sleep(100);
            pipe.Read(buffer, 0, 256);
            UnityEngine.Debug.Log(Encoding.ASCII.GetString(buffer));
            pipe.Flush();
            buffer = new byte[256];
            SendTo("HelloWorld");
        }

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
