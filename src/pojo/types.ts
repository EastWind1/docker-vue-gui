export type DockerImage = {
    Containers:string,
    CreatedAt:string,
    CreatedSince:string,
    Digest:string,
    ID:string,
    Repository:string,
    SharedSize:string,
    Size:string,
    Tag:string,
    UniqueSize:string,
    VirtualSize:string,
};
export type DockerContainer = {
    Command: string,
    CreatedAt: string,
    ID: string,
    Image: string,
    Labels: string,
    LocalVolumes: string,
    Mounts: string,
    Names: string,
    Networks: string,
    Ports: string,
    RunningFor: string,
    Size: string,
    State: string,
    Status: string
};
export type DockerSearchedImage = {
    Description: string,
    IsAutomated: string,
    IsOfficial: string,
    Name: string,
    StarCount: string
}
export type DockerState = {
    ID: string,
    Containers:number,
    ContainersRunning:number,
    ContainersPaused:number,
    ContainersStopped:number,
    Images:number,
    Driver: string,
    DriverStatus: string[][],
    Plugins: {
        Volume: string[],
        Network: string[],
        Authorization: any,
        Log: string[],
    },
    MemoryLimit: boolean,
    SwapLimit: boolean,
    KernelMemory: boolean,
    KernelMemoryTCP: boolean,
    CpuCfsPeriod: boolean,
    CpuCfsQuota: boolean,
    CPUShares: boolean,
    CPUSet: boolean,
    PidsLimit: boolean,
    IPv4Forwarding: boolean,
    BridgeNfIptables: boolean,
    BridgeNfIp6tables: boolean,
    Debug: boolean,
    NFd:number,
    OomKillDisable: boolean,
    NGoroutines:number,
    SystemTime: string,
    LoggingDriver: string,
    CgroupDriver: string,
    CgroupVersion: string,
    NEventsListener:number,
    KernelVersion: string,
    OperatingSystem: string,
    OSVersion: string,
    OSType: string,
    Architecture: string,
    IndexServerAddress: string,
    RegistryConfig: {
        AllowNondistributableArtifactsCIDRs: [],
        AllowNondistributableArtifactsHostnames: [],
        InsecureRegistryCIDRs: [
            string
        ],
        IndexConfigs: {
            [key: string]: {
                Name: string,
                Mirrors:string[],
                Secure: boolean,
                Official: boolean
            }
        },
        Mirrors:string[],
    },
    NCPU:number,
    MemTotal:number,
    GenericResources: any,
    DockerRootDir: string,
    HttpProxy: string,
    HttpsProxy: string,
    NoProxy: string,
    Name: string,
    Labels: [],
    ExperimentalBuild: boolean,
    ServerVersion: string,
    Runtimes: {
        [key: string]: {path:string}
    },
    DefaultRuntime: string,
    Swarm: {
        NodeID: string,
        NodeAddr: string,
        LocalNodeState: string,
        ControlAvailable: boolean,
        Error: string,
        RemoteManagers: any
    },
    LiveRestoreEnabled: boolean,
    Isolation: string,
    InitBinary: string,
    ContainerdCommit: {
        ID: string,
        Expected: string
    },
    RuncCommit: {
        ID: string,
        Expected: string
    },
    InitCommit: {
        ID: string,
        Expected: string
    },
    SecurityOptions: [
        string
    ],
    Warnings: any,
    ClientInfo: {
        Debug: boolean,
        Platform: {
            Name: string
        },
        Version: string,
        GitCommit: string,
        GoVersion: string,
        Os: string,
        Arch: string,
        BuildTime: string,
        Context: string,
        Plugins: [],
        Warnings: any
    }
}