insert Registration {
    registration_date := datetime_of_statement(),
    registration_note := <str>$registration_note,
    fullname := <str>$fullname,
    nickname := <str>$nickname,
    birth_date := <datetime>$birth_date,
    birth_place := <str>$birth,
    gender := <str>$gender,
    nisn := <optional str>$nisn,
    previous_school := <optional str>$previous_school,
    province := <str>$province,
    city_or_regency := <str>$city_or_regency,
    district := <str>$district,
    village := <str>$village,
    postal_code := <str>$postal_code,
    street := <str>$street,
    house_number := <str>$house_number,
    address_description := <optional str>$address_description,
    mother_fullname := <str>$mother_fullname,
    mother_phone := <str>$mother_phone,
    mother_email := <str>$mother_email, 
    father_fullname := <str>$father_fullname, 
    father_phone := <str>$father_phone, 
    father_email := <str>$father_email,
    ValueCenter := (
        select ValueCenter
        filter .id = <uuid>$valueCenterId
    ),
    AcademicYear := (
        select AcademicYear
        filter .id = <uuid>$academicYearId
    ),
}