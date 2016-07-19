#!/bin/sh

id=1
age=7
while read line; do
  # need to get an age
  if [ `expr $id '%' 12` -eq 0 ]; then
      age=`expr $age + 1`
  fi
  idstr=`printf "%03d" "$id"`
  if [ $age -le 15 ]; then
      echo "{id:'$idstr',name:'$line',age:'$age'},"
  else
      echo "{id:'$idstr',name:'$line'},"
  fi
  id=`expr $id + 1`
done < names.list
