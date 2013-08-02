#! /bin/sh
#
#	/etc/rc.d/init.d/logstash
#
#	Starts Logstash as a daemon
#
# chkconfig: 2345 20 80
# description: Starts Logstash as a daemon
# pidfile: /var/run/logstash-agent.pid

### BEGIN INIT INFO
# Provides: logstash
# Required-Start: $local_fs $remote_fs
# Required-Stop: $local_fs $remote_fs
# Default-Start: 2 3 4 5
# Default-Stop: S 0 1 6
# Short-Description: Logstash
# Description: Starts Logstash as a daemon.
# Modified originally from https://gist.github.com/2228905#file_logstash.sh

### END INIT INFO

# Amount of memory for Java
#JAVAMEM=256M

# Location of logstash files
LOCATION=/opt/logstash

PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
DESC="Logstash Daemon"
NAME=java
DAEMON=$(which java)
CONFIG_DIR=/opt/logstash/logstash.conf
LOGFILE=/opt/logstash/logstash.log
JARNAME=logstash-monolithic.jar
#ARGS="-Xmx$JAVAMEM -Xms$JAVAMEM -jar ${JARNAME} agent --config ${CONFIG_DIR} --log ${LOGFILE} --grok-patterns-path ${PATTERNSPATH}"
ARGS="-jar ${JARNAME} agent --config ${CONFIG_DIR} --log ${LOGFILE}"
SCRIPTNAME=/etc/init.d/logstash
PIDFILE=/var/run/logstash.pid
base=logstash

# Exit if the package is not installed
if [ ! -x "$DAEMON" ]; then
{
  echo "Couldn't find $DAEMON"
  exit 99
}
fi

. /etc/init.d/functions

#
# Function that starts the daemon/service
#
do_start()
{
  cd $LOCATION && \
  ($DAEMON $ARGS &) \
  && success || failure
}

set_pidfile()
{
  pgrep -f "$DAEMON[[:space:]]*$ARGS" > $PIDFILE
}

#
# Function that stops the daemon/service
#
do_stop()
{
  pid=`cat $PIDFILE`
                       if checkpid $pid 2>&1; then
                           # TERM first, then KILL if not dead
                           kill -TERM $pid >/dev/null 2>&1
                           usleep 100000
                           if checkpid $pid && sleep 1 &&
                              checkpid $pid && sleep $delay &&
                              checkpid $pid ; then
                                kill -KILL $pid >/dev/null 2>&1
                                usleep 100000
                           fi
                        fi
                        checkpid $pid
                        RC=$?
                        [ "$RC" -eq 0 ] && failure $"$base shutdown" || success $"$base shutdown"

}

case "$1" in
  start)
    echo -n "Starting $DESC: "
    do_start
    touch /var/lock/subsys/$JARNAME
    set_pidfile
    ;;
  stop)
    echo -n "Stopping $DESC: "
    do_stop
    rm /var/lock/subsys/$JARNAME
    rm $PIDFILE
    ;;
  restart|reload)
    echo -n "Restarting $DESC: "
    do_stop
    do_start
    touch /var/lock/subsys/$JARNAME
    set_pidfile
    ;;
  status)
    status -p $PIDFILE
    ;;
  *)
    echo "Usage: $SCRIPTNAME {start|stop|status|restart}" >&2
    exit 3
    ;;
esac

echo
exit 0
