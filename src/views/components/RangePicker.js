import React, { Component } from 'react'

const RangePicker = (props) =>{
    
    return (
        <RangePicker 
        key='chosedate'
        format="YYYY-MM-DD HH:mm:ss"
        onChange={this.data_date}
        defaultValue={startdate && enddate? 
            [moment(startdate.split(' ')[0]),moment(enddate.split(' ')[0])]
            :
            [moment().startOf('week').add(-3,'day'),moment().endOf('week').add(-3,'day')]
        }
        showTime={{
        defaultValue:[moment('00:00:01', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
        }} />
    )
}
