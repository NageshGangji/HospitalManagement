package com.hms.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.appointment.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment ,Long>{

}