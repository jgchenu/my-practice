// Node在v0.11中提供了一种新的策略使得负载均衡更加合理，
// 这种新的策略叫做Round-Robin，又叫轮叫调度，工作方式是由主进程接受连接，将其依次分发给工作进程。
// 分发的策略是在N个工作进程中，每次选择第 i = (i + 1) mod n个进程来发送连接。在cluster 模块中启用他的方式：

// 启用Round-Robin
cluster.schedulingPolicy = cluster.SCHED_RR; 
// 不启用Round-Robin
cluster.schedulingPolicy = cluster.SCHED_NONE;
// 或者在环境􏳙量中设置NODE_CLUSTER_SCHED_POLICY的值
// export NODE_CLUSTER_SCHED_POLICY=rr
// export NODE_CLUSTER_SCHED_POLICY=none