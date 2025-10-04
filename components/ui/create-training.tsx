import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CreateTrainingFormProps {
  userRole: string;
  isOpen: boolean;
  facultyList?: { user_id: string | number; name: string }[];
  selectedInstructor?: string;
  setSelectedInstructor?: React.Dispatch<React.SetStateAction<string>>;
  startDate: Date | null;  // Allow null for startDate
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;  // Allow null for setStartDate
  endDate: Date | null;  // Allow null for endDate
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;  // Allow null for setEndDate
  facultyName?: string;
  handleCreateProgram: (e: React.FormEvent) => void;
  onClose: () => void;
}

const CreateTrainingForm: React.FC<CreateTrainingFormProps> = ({
  userRole,
  facultyList = [],
  selectedInstructor: selectedInstructorProp = "",
  setSelectedInstructor: setSelectedInstructorProp = () => {},
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  facultyName,
  handleCreateProgram,
  onClose,
}) => {
  const [description, setDescription] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState(selectedInstructorProp);
  const [isFormValid, setIsFormValid] = useState<boolean>(false); 

  // Helper function to validate form
  const validateForm = () => {
    // Check if title, description, startDate, and endDate are valid
    const isValid = description.trim() !== "" && 
                    startDate !== null && 
                    endDate !== null && 
                    new Date(startDate) <= new Date(endDate);
    setIsFormValid(isValid);
  };

  // Watch for changes and validate form
  useEffect(() => {
    validateForm();
  }, [description, startDate, endDate]);

  const handleSelectChange = (val: string) => {
    setSelectedInstructor(val); 
    setSelectedInstructorProp(val); 
  };

  const selectedFaculty = facultyList.find((f) => {
    return f.user_id === Number(selectedInstructor); 
  });

  const formatDate = (date: Date | null) => {
    return date ? date.toISOString().split("T")[0] : "";
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value ? new Date(e.target.value) : null;
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value ? new Date(e.target.value) : null;
    setEndDate(newEndDate);
  };

  return (
    <div className="relative max-w-4xl w-full mx-auto px-6">
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create New Training Program
          </DialogTitle>
          <DialogDescription>
            Set up a new training program with curriculum, timeline, and details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateProgram} className="space-y-6 w-full">
          <div className="space-y-1">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700 block">
              Program Title
            </Label>
            <Input
              id="title"
              placeholder="Enter program title"
              required
              className="w-full h-11 border-2 border-gray-300 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700 block">
              Short Description
            </Label>
            <Input
              id="description"
              placeholder="Enter a brief description of the course"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full h-11 border-2 border-gray-300 focus:border-blue-500 transition-colors"
            />
          </div>

          {userRole === "admin" ? (
            <div className="space-y-1">
              <Label htmlFor="faculty" className="text-sm font-medium text-gray-700 block">
                Select Faculty
              </Label>
              <Select value={selectedInstructor} onValueChange={handleSelectChange} required>
                <SelectTrigger className="w-full h-11 border-2 border-gray-300 focus:border-blue-500 transition-colors">
                  <SelectValue>
                    {selectedFaculty ? selectedFaculty.name : "Select faculty"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {facultyList.map((faculty) => (
                    <SelectItem key={faculty.user_id} value={faculty.user_id.toString()}>
                      {faculty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700 block">Faculty</Label>
              <Input
                value={facultyName}
                readOnly
                className="w-full h-11 border-2 border-gray-300 bg-gray-100 cursor-not-allowed"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium text-gray-700 block">
                Start Date
              </Label>
              <Input
                type="date"
                id="startDate"
                value={formatDate(startDate)}  // Convert Date to string
                onChange={handleStartDateChange}
                min={new Date().toISOString().split("T")[0]} 
                className="h-11 border-2 border-gray-300 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-medium text-gray-700 block">
                End Date
              </Label>
              <Input
                type="date"
                id="endDate"
                value={formatDate(endDate)}  // Convert Date to string
                onChange={handleEndDateChange}
                min={formatDate(startDate)}  // Ensure end date is after start date
                className="h-11 border-2 border-gray-300 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-2 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isFormValid}
            >
              Create Program
            </Button>
          </div>
        </form>
      </DialogContent>
    </div>
  );
};

export default CreateTrainingForm;
